package com.nazmiunlu.turkiyebulmacasi;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.window.OnBackInvokedDispatcher;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.UserMessagingPlatform;

import org.json.JSONObject;

public class MainActivity extends Activity {
    private static final String TAG = "TurkiyeBulmacasiAds";

    private WebView webView;
    private RewardedAd rewardedAd;
    private InterstitialAd interstitialAd;
    private ConsentInformation consentInformation;
    private boolean mobileAdsInitialized = false;
    private int interstitialRequestCount = 0;

    // Google test ad unit IDs. Production IDs are enabled only after testing is complete.
    private static final String TEST_REWARDED_AD_UNIT_ID =
        "ca-app-pub-3940256099942544/5224354917";
    private static final String TEST_INTERSTITIAL_AD_UNIT_ID =
        "ca-app-pub-3940256099942544/1033173712";

    private static final String APP_URL =
        "https://nazmiunlu197-star.github.io/turkiye-bulmacasi/index.html?v=83";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new AdBridge(), "AndroidAds");

        requestConsentAndInitializeAds();

        if (savedInstanceState == null) {
            webView.loadUrl(APP_URL);
        } else {
            webView.restoreState(savedInstanceState);
        }

        if (Build.VERSION.SDK_INT >= 33) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                () -> handleBackNavigation()
            );
        }

        hideSystemUi();
    }

    private void requestConsentAndInitializeAds() {
        consentInformation = UserMessagingPlatform.getConsentInformation(this);
        ConsentRequestParameters params = new ConsentRequestParameters.Builder().build();

        consentInformation.requestConsentInfoUpdate(
            this,
            params,
            () -> UserMessagingPlatform.loadAndShowConsentFormIfRequired(
                this,
                formError -> {
                    if (formError != null) {
                        Log.w(TAG, "Consent form: " + formError.getMessage());
                    }
                    if (consentInformation.canRequestAds()) {
                        initializeMobileAds();
                    }
                }
            ),
            requestConsentError -> {
                Log.w(TAG, "Consent update: " + requestConsentError.getMessage());
                if (consentInformation.canRequestAds()) {
                    initializeMobileAds();
                }
            }
        );

        if (consentInformation.canRequestAds()) {
            initializeMobileAds();
        }
    }

    private synchronized void initializeMobileAds() {
        if (mobileAdsInitialized) return;
        mobileAdsInitialized = true;

        MobileAds.initialize(this, initializationStatus -> {
            loadRewardedAd();
            loadInterstitialAd();
        });
    }

    private void loadRewardedAd() {
        RewardedAd.load(
            this,
            TEST_REWARDED_AD_UNIT_ID,
            new AdRequest.Builder().build(),
            new RewardedAdLoadCallback() {
                @Override
                public void onAdLoaded(RewardedAd ad) {
                    rewardedAd = ad;
                    Log.d(TAG, "Rewarded test ad loaded");
                }

                @Override
                public void onAdFailedToLoad(LoadAdError adError) {
                    rewardedAd = null;
                    Log.w(TAG, "Rewarded ad failed: " + adError.getMessage());
                }
            }
        );
    }

    private void loadInterstitialAd() {
        InterstitialAd.load(
            this,
            TEST_INTERSTITIAL_AD_UNIT_ID,
            new AdRequest.Builder().build(),
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(InterstitialAd ad) {
                    interstitialAd = ad;
                    Log.d(TAG, "Interstitial test ad loaded");
                }

                @Override
                public void onAdFailedToLoad(LoadAdError adError) {
                    interstitialAd = null;
                    Log.w(TAG, "Interstitial ad failed: " + adError.getMessage());
                }
            }
        );
    }

    private void showRewardedAd(String rewardKey) {
        if (rewardedAd == null) {
            notifyAdUnavailable(rewardKey);
            loadRewardedAd();
            return;
        }

        RewardedAd ad = rewardedAd;
        rewardedAd = null;
        ad.setFullScreenContentCallback(new FullScreenContentCallback() {
            @Override
            public void onAdDismissedFullScreenContent() {
                loadRewardedAd();
                hideSystemUi();
            }

            @Override
            public void onAdFailedToShowFullScreenContent(AdError adError) {
                notifyAdUnavailable(rewardKey);
                loadRewardedAd();
                hideSystemUi();
            }
        });

        ad.show(this, rewardItem -> notifyRewardEarned(rewardKey));
    }

    private void maybeShowInterstitialAd() {
        interstitialRequestCount++;
        if (interstitialRequestCount % 3 != 0) return;

        if (interstitialAd == null) {
            loadInterstitialAd();
            return;
        }

        InterstitialAd ad = interstitialAd;
        interstitialAd = null;
        ad.setFullScreenContentCallback(new FullScreenContentCallback() {
            @Override
            public void onAdDismissedFullScreenContent() {
                loadInterstitialAd();
                hideSystemUi();
            }

            @Override
            public void onAdFailedToShowFullScreenContent(AdError adError) {
                loadInterstitialAd();
                hideSystemUi();
            }
        });
        ad.show(this);
    }

    private void notifyRewardEarned(String rewardKey) {
        if (webView == null) return;
        String script =
            "window.onAdRewardEarned && window.onAdRewardEarned(" +
            JSONObject.quote(rewardKey) + ");";
        webView.evaluateJavascript(script, null);
    }

    private void notifyAdUnavailable(String rewardKey) {
        if (webView == null) return;
        String script =
            "window.onAdUnavailable && window.onAdUnavailable(" +
            JSONObject.quote(rewardKey) + ");";
        webView.evaluateJavascript(script, null);
    }

    public class AdBridge {
        @JavascriptInterface
        public void showRewarded(String rewardKey) {
            runOnUiThread(() -> showRewardedAd(rewardKey));
        }

        @JavascriptInterface
        public void maybeShowInterstitial() {
            runOnUiThread(MainActivity.this::maybeShowInterstitialAd);
        }
    }

    private void hideSystemUi() {
        if (Build.VERSION.SDK_INT >= 30) {
            getWindow().setDecorFitsSystemWindows(false);
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.hide(
                    WindowInsets.Type.statusBars() |
                    WindowInsets.Type.navigationBars()
                );
                controller.setSystemBarsBehavior(
                    WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                );
            }
        } else {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_FULLSCREEN |
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            );
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemUi();
    }

    private void handleBackNavigation() {
        if (webView == null) {
            finish();
            return;
        }

        String url = webView.getUrl();
        if (url != null && (url.contains("fullapp.html") || url.contains("game.html"))) {
            webView.loadUrl(APP_URL);
            return;
        }

        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            finish();
        }
    }

    @Override
    public void onBackPressed() {
        if (Build.VERSION.SDK_INT < 33) {
            handleBackNavigation();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        if (webView != null) webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        hideSystemUi();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onPause() {
        if (webView != null) webView.onPause();
        super.onPause();
    }
}
