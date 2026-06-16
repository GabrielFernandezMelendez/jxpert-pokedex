import { test, expect } from "@playwright/test";

//esto agrupa todos los test que en este caso osn todos del mismo tipo que es de e2e antes de que comience a tocar el codigo
test.describe("Pokédex - Characterization Tests", () => {
  //esto hace que antes de comenzar cada test se vuelva a la pagina principal y todos empiecen de "cero"
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  //verificamos que el header es pokedex,verifica que el primer elemento se ve y tienene un tiempo maximo de 10s y valida que esten justo 151 pokemons
  test("the page loads and displays Kanto pokémons", async ({ page }) => {
    await expect(page.locator(".header__title")).toHaveText("Pokédex");
    await expect(page.locator(".grid li").first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator(".grid > li")).toHaveCount(151);
  });
  //cargan los pokemon , buscamos pikachu y verificamos que efectivamente es el primer pokemon en salir
  test("the search bar filters pokémons by name", async ({ page }) => {
    await expect(page.locator(".grid li").first()).toBeVisible({ timeout: 10000 });

    await page.fill('input[type="text"]', "pikachu");
    await expect(page.locator(".grid > li")).toHaveCount(1);
    await expect(page.locator(".card__title").first()).toHaveText("pikachu");
  });
  //filtra con el dropdown por johto y verificamos que cargan los datos y el primero no es bulbasur
  test("changing region loads new pokémons", async ({ page }) => {
    await expect(page.locator(".grid li").first()).toBeVisible({ timeout: 10000 });

    await page.click(".dropdown__button");
    await page.click('li:text("johto")');

    await expect(page.locator(".grid li").first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator(".card__title").first()).not.toHaveText("bulbasaur");
  });
  //verificamos que cambia el primer pokemon al filtrar por la propiedad HP
  test("sorting by hp reorders pokémons", async ({ page }) => {
    await expect(page.locator(".grid li").first()).toBeVisible({ timeout: 10000 });

    const firstPokemonBefore = await page.locator(".card__title").first().textContent();

    await page.click(".sort__button");
    await page.click('.sort__pill:text("Hp")');

    await expect(page.locator(".card__title").first()).not.toHaveText(firstPokemonBefore!);
  });
  //validamos que no se muestra ninguna card al poner el nombre de un  pokemon que no existe
  test("searching for nonexistent pokémon shows no results", async ({ page }) => {
    await expect(page.locator(".grid li").first()).toBeVisible({ timeout: 10000 });

    await page.fill('input[type="text"]', "pokemonquenoexiste");
    await expect(page.locator(".noresults")).toBeVisible();
    await expect(page.locator(".noresults")).toContainText("pokemonquenoexiste");
  });
  //validamos que se muestran pokemons por tipo , en este test lo probe con tipo fuego
  test("the search bar filters pokémons by type", async ({ page }) => {
    await expect(page.locator(".grid > li").first()).toBeVisible({ timeout: 10000 });

    await page.fill('input[type="text"]', "fire");
    const count = await page.locator(".grid > li").count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(151);
  });
});
