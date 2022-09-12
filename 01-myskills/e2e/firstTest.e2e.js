describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should register a new skill', async () => {
    const newSkillInput = await element(by.id('new-skill-input'));
    const addNewSkillButton = await element(by.id('add-new-skill-button'));

    await newSkillInput.tap();
    await newSkillInput.typeText('React Native\n');
    await addNewSkillButton.tap();

    const mySkillsFlatList = await element(by.id('my-skills-flatlist'));

    await expect(element(mySkillsFlatList)).toBeVisible();

    await expect(element(by.id('React Native'))).toBeVisible();
  });
});
