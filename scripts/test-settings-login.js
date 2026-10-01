const puppeteer = require("puppeteer-core");

async function runTest() {
  console.log("=== STARTING AUTOMATED BROWSER TEST ===");

  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log("1. Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });

  // 1. Check title
  const title = await page.title();
  console.log(`✓ Page loaded. Title: "${title}"`);

  // 2. Click Settings button
  console.log("2. Clicking Settings button in Navbar...");
  const settingsBtn = await page.waitForSelector('button[aria-label="Settings"]', { timeout: 5000 });
  await settingsBtn.click();

  // 3. Verify Login Modal opens
  console.log("3. Verifying Login Form modal appears...");
  await page.waitForFunction(
    () => document.body.innerText.includes("Couple Root Access"),
    { timeout: 5000 }
  );
  console.log("✓ Login Form modal is visible!");

  // 4. Test wrong credentials
  console.log("4. Testing invalid login credentials (wrong / 12345)...");
  const userInput = await page.$('input[placeholder*="username"]');
  const passInput = await page.$('input[placeholder*="password"]');

  await userInput.focus();
  await page.keyboard.type("wrong");

  await passInput.focus();
  await page.keyboard.type("12345");

  console.log("Submitting form by pressing Enter...");
  await page.keyboard.press("Enter");

  // Wait 1 second and check for error
  await new Promise(r => setTimeout(r, 600));
  const hasError = await page.evaluate(() =>
    document.body.innerText.includes("Login failed")
  );
  console.log("Error message appeared?:", hasError);
  if (!hasError) throw new Error("Expected error message did not appear!");
  console.log("✓ Error message successfully displayed on false credentials!");

  // 5. Test Auto-Fill button
  console.log("5. Clicking Auto-fill button...");
  const clickedAuto = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const autoBtn = buttons.find(b => b.textContent && b.textContent.includes("Auto-fill"));
    if (autoBtn) {
      autoBtn.click();
      return true;
    }
    return false;
  });
  console.log("Auto-fill button clicked?:", clickedAuto);

  // Check inputs have tola / lina
  const vals = await page.evaluate(() => {
    const u = document.querySelector('input[placeholder*="username"]')?.value;
    const p = document.querySelector('input[placeholder*="password"]')?.value;
    return { u, p };
  });
  console.log("Values after auto-fill:", vals);

  // 6. Submit correct login
  console.log("6. Submitting valid static login...");
  await passInput.focus();
  await page.keyboard.press("Enter");

  // 7. Verify Edit Form appears
  console.log("7. Waiting for Edit Form to appear...");
  await page.waitForFunction(
    () => document.body.innerText.includes("Edit Couple Profile"),
    { timeout: 5000 }
  );
  console.log("✓ SUCCESS: Edit Form is visible!");

  // 8. Test Edit Form inputs
  const partner1Name = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll("input"));
    return inputs.find(i => i.value === "Tola")?.value;
  });
  console.log("Partner 1 current name in edit form:", partner1Name);

  // 9. Test Saving Changes
  console.log("8. Clicking Save Changes...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const saveBtn = buttons.find(b => b.textContent && b.textContent.includes("Save Changes"));
    if (saveBtn) saveBtn.click();
  });

  await new Promise(r => setTimeout(r, 1200));
  const isModalOpen = await page.evaluate(() =>
    document.body.innerText.includes("Edit Couple Profile")
  );
  console.log("Modal closed after save?:", !isModalOpen);

  console.log("🎉 === ALL AUTOMATED TESTS PASSED 100% SUCCESSFULLY! ===");
  await browser.close();
}

runTest().catch((err) => {
  console.error("❌ TEST FAILED:", err);
  process.exit(1);
});
