# RELEASE.md — what *you* need to do to ship KeyLoop

Everything below needs your accounts, certificates or final art, so it was
deliberately left out of the automated build. The app itself is ready: the
web bundle builds clean, both native projects are generated, landscape-locked
and synced.

## 1. One-time decisions

- [ ] **Final app name and bundle id.** Currently `KeyLoop` /
      `com.keyloop.app` (placeholders). Change in `capacitor.config.ts`,
      then run `npx cap sync`. If you change the id after adding platforms,
      also update `android/app/build.gradle` (`applicationId`, `namespace`)
      and the Bundle Identifier in Xcode's target settings.
- [ ] **Final icon + splash art.** `resources/icon.svg` is a placeholder.
      Export a 1024×1024 PNG (`resources/icon.png`) and a 2732×2732 splash
      (`resources/splash.png`), then generate all native sizes with:
      ```bash
      npm install -D @capacitor/assets
      npx capacitor-assets generate
      ```

## 2. Android (Google Play)

- [ ] Google Play developer account (one-time $25 fee).
- [ ] Open the project: `npx cap open android` (Android Studio, JDK 17+).
- [ ] Create a release keystore (**back it up — losing it means you can never
      update the app**):
      ```bash
      keytool -genkey -v -keystore keyloop-release.keystore \
        -alias keyloop -keyalg RSA -keysize 2048 -validity 10000
      ```
- [ ] Configure signing in `android/app/build.gradle` (or Android Studio →
      Build → Generate Signed App Bundle) and build an `.aab`.
- [ ] Play Console: create the app, upload the bundle to a closed test track
      first, fill in the data-safety form (easy: the app makes **no network
      calls and collects no data**), content rating, store listing.

## 3. iOS (App Store)

- [ ] Apple Developer Program membership ($99/year) and a Mac with Xcode.
- [ ] `sudo gem install cocoapods` (or `brew install cocoapods`), then
      `npx cap sync ios` on the Mac so `pod install` runs.
- [ ] Open `npx cap open ios`, set your Team under Signing & Capabilities
      (Xcode can manage certificates/profiles automatically).
- [ ] Product → Archive → Distribute App → App Store Connect.
- [ ] App Store Connect: create the app record, screenshots (landscape,
      6.7" and 6.5" iPhone + 12.9" iPad sizes), privacy questionnaire
      (again: no data collected), then submit for review.

## 4. Store listing assets (both stores)

- [ ] Screenshots — run on a device/emulator in landscape and capture.
- [ ] Short + full description, feature graphic (Play: 1024×500).
- [ ] Privacy policy URL — even "collects nothing" apps usually need a page
      stating that.

## 5. Licensing note

The piano samples are **Salamander Grand Piano by Alexander Holm, CC-BY 3.0**
(see `public/samples/LICENSE.txt`). Keep an attribution line in your store
listing or in-app settings/about screen, e.g.:
*"Piano samples: Salamander Grand Piano by Alexander Holm (CC-BY 3.0)."*
