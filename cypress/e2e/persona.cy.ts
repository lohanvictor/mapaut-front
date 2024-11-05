describe("Persona suit", () => {
  it("should create a persona", () => {
    cy.visit("http://localhost:3000");

    cy.get("#email-input").type("usuario2@hotmail.com");
    cy.get("#email-input").should("have.value", "usuario2@hotmail.com");

    cy.get("#outlined-adornment-password").type("asdqwe123");
    cy.get("#outlined-adornment-password").should("have.value", "asdqwe123");

    cy.get("#logar-button").click();

    cy.get("#loading-modal").should("exist");

    // Esperando a página carregar e clica em criar persona
    cy.get("#button-create-persona", {
      timeout: 10000,
    }).click();

    cy.url().should("include", "/personas/create");

    // Iniciando criação de persona
    cy.get("#button-start-create-persona").click();

    // Escolhendo modelo 2
    cy.get("#button-model-2").click();

    // Iniciando FCA
    // Interação Social
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(1)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(2)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(4)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(7)`
    ).click();

    cy.get("#vga-next-button").click();

    // Comunicação
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(1)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(2)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(3)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(7)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(8)`
    ).click();

    cy.get("#vga-next-button").click();

    // Comportamento
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(1)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(4)`
    ).click();
    cy.get(
      `body > div.flex.flex-row.w-full.h-full.bg-gray-50 > div.flex-1.flex.overflow-y-auto > div > div > div > div.w-full.flex.flex-col.gap-2.max-h-full.overflow-y-auto > button:nth-child(9)`
    ).click();

    cy.get("#vga-next-button").click();

    // Cognição
    cy.get("#vga-next-button").click();

    // Características demográficas
    cy.get("#demographic-characteristics-name").type("Nome de teste");
    cy.get("#demographic-characteristics-name").should(
      "have.value",
      "Nome de teste"
    );

    cy.get("#demographic-characteristics-genero").type("Masculino");
    cy.get("#demographic-characteristics-genero").should(
      "have.value",
      "Masculino"
    );

    cy.get("#demographic-characteristics-img-input").selectFile(
      "C:\\Users\\UEA\\Pictures\\tcc\\fake_helena.jpg"
    );

    cy.get("#demographic-characteristics-next-button").click();

    // Características gerais
    cy.get("#c-general-characteristics-select-language").click();
    cy.get("#Verbal").click();
    cy.get("#c-general-characteristics-select-language").should(
      "contain.text",
      "Verbal"
    );

    cy.get("#c-general-characteristics-select-autism").click();
    cy.get("#Moderado").click();
    cy.get("#c-general-characteristics-select-autism").should(
      "contain.text",
      "Moderado"
    );

    cy.get("#general-characteristics-next-button").click();

    // Sobre a persona
    cy.get("#standard-textarea").type("Teste de descrição");
    cy.get("#standard-textarea").should("have.value", "Teste de descrição");

    cy.get("#about-persona-next-button").click();

    // Final
    cy.get("#main-characteristics > div > h1").should(
      "contain.text",
      "Nome de teste"
    );
    cy.get("#main-characteristics > div > span:nth-child(2)").should(
      "contain.text",
      "Masculino, 10 anos"
    );
    cy.get("#main-characteristics > div > span:nth-child(3)").should(
      "contain.text",
      "Nível de autismo: Moderado"
    );
    cy.get("#main-characteristics > div > span:nth-child(4)").should(
      "contain.text",
      "Linguagem: Verbal"
    );
    cy.get("#main-characteristics > div > span:nth-child(5)").should(
      "contain.text",
      "Possui sensibilidade ao som"
    );
    cy.get("#about-container > div > p:nth-child(1)").should(
      "contain.text",
      "Teste de descrição"
    );
  });
});
