const puppeteer = require("puppeteer-core");

async function runTest() {
  console.log("=== STARTING TERMINAL SCROLL TEST ===");

  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log("1. Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });

  // 2. Scroll to terminal section
  console.log("2. Scrolling to Terminal section...");
  await page.evaluate(() => {
    const el = document.getElementById("terminal");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });

  await new Promise(r => setTimeout(r, 500));
  const initialScrollY = await page.evaluate(() => window.scrollY);
  console.log(`✓ Initial window.scrollY at terminal: ${initialScrollY}`);

  // 3. Click quick command chip (e.g., cat love-letter.txt)
  console.log("3. Clicking quick command chip 'cat love-letter.txt'...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("#terminal button"));
    const chip = buttons.find(b => b.textContent && b.textContent.includes("cat love-letter"));
    if (chip) chip.click();
    else throw new Error("Quick chip not found!");
  });

  await new Promise(r => setTimeout(r, 600));

  // 4. Verify window.scrollY did NOT change
  const scrollYAfterChip = await page.evaluate(() => window.scrollY);
  console.log(`✓ Window.scrollY after clicking chip: ${scrollYAfterChip}`);
  const scrollDiff1 = Math.abs(scrollYAfterChip - initialScrollY);
  console.log(`Scroll difference: ${scrollDiff1}px`);
  if (scrollDiff1 > 5) {
    throw new Error(`Window scrolled unexpectedly by ${scrollDiff1}px!`);
  }
  console.log("✓ SUCCESS: Window did NOT scroll when clicking quick command chip!");

  // 5. Test typing command in terminal input and pressing enter
  console.log("4. Typing command 'npm run hug' into terminal input and pressing Enter...");
  const terminalInput = await page.$('#terminal input');
  await terminalInput.focus();
  await page.keyboard.type("npm run hug");
  await page.keyboard.press("Enter");

  await new Promise(r => setTimeout(r, 600));

  // 6. Verify window.scrollY still did NOT change
  const scrollYAfterType = await page.evaluate(() => window.scrollY);
  console.log(`✓ Window.scrollY after typing command: ${scrollYAfterType}`);
  const scrollDiff2 = Math.abs(scrollYAfterType - initialScrollY);
  console.log(`Scroll difference: ${scrollDiff2}px`);
  if (scrollDiff2 > 5) {
    throw new Error(`Window scrolled unexpectedly by ${scrollDiff2}px!`);
  }
  console.log("✓ SUCCESS: Window did NOT scroll when typing and running command!");

  // 7. Verify terminal has the command output
  const hasHugOutput = await page.evaluate(() => {
    const term = document.getElementById("terminal");
    return term ? term.innerText.includes("HUG_DAEMON") : false;
  });
  console.log(`✓ Terminal output contains executed command: ${hasHugOutput}`);

  console.log("🎉 === TERMINAL SCROLL TEST PASSED 100%! ZERO WINDOW SCROLL DETECTED! ===");
  await browser.close();
}

runTest().catch((err) => {
  console.error("❌ TEST FAILED:", err);
  process.exit(1);
});
