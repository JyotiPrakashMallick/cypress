# Guidelines in Scripting and Code Review

1. Avoid  using page objects in cypress as advice use custom commands
2. Write specs in isolation
3. Organize Tests by page and components
4. Don’t use selectors that are prone to changes
5. Use selectors that has id, data-test-id 
6. Don't couple multiple tests together.
7. Tests should always be able to be run independently and still pass.
8. Use custom commands only if an action will be reuse for two or more components
9. Cypress does not allow multi access to different url in one spec
10. Add multiple assertions coz we are not doing unit tests we are doing e2e
11. Clean up state before tests run
12. Unnecessary Waiting, Use route aliases or assertions to guard Cypress from proceeding until an explicit condition is met.
13. Set variables on your test data