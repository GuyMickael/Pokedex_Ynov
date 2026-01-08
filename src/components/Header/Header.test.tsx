import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { describe, it, expect } from "vitest";

describe("Header", () => {
  it("affiche une image avec le bon src et la bonne largeur", () => {
    render();

    // Récupère l’élément <img> dans le DOM
    const img = screen.getByTestId("pokeball-test-img");

    // Vérifie que l’attribut src correspond bien
    expect(img).toHaveAttribute("src", "/pokedexImage.png");

    // Vérifie que l’attribut width correspond à "150px"
    expect(img).toHaveAttribute("width", "150px");
  });
});
