import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { SEED_PROPERTIES, SEED_LEADS, SEED_MONOGRAPHS } from "../src/lib/seedData.ts";

describe("Seed Data & Model Integrity", () => {
  test("every property has valid unique slug, price, and coordinates", () => {
    const slugs = new Set<string>();
    
    assert.ok(SEED_PROPERTIES.length > 0, "Properties should not be empty");

    for (const prop of SEED_PROPERTIES) {
      assert.ok(prop.id, "Property must have an id");
      assert.ok(prop.title, "Property must have a title");
      assert.ok(prop.slug, `Property ${prop.title} must have a slug`);
      assert.ok(!slugs.has(prop.slug), `Slug '${prop.slug}' must be unique`);
      slugs.add(prop.slug);

      assert.ok(prop.price > 0, `Price of ${prop.title} must be positive`);
      assert.ok(prop.areaSqm > 0, `Area of ${prop.title} must be positive`);
      assert.ok(prop.bedrooms >= 0, `Bedrooms of ${prop.title} must be non-negative`);
      assert.ok(prop.bathrooms >= 0, `Bathrooms of ${prop.title} must be non-negative`);
      
      // Coordinates check
      assert.ok(prop.latitude >= -90 && prop.latitude <= 90, `Latitude of ${prop.title} must be between -90 and 90`);
      assert.ok(prop.longitude >= -180 && prop.longitude <= 180, `Longitude of ${prop.title} must be between -180 and 180`);

      // Media check
      assert.ok(prop.heroImage && prop.heroImage.startsWith("http"), `Hero image for ${prop.title} must be a valid URL`);
      assert.ok(Array.isArray(prop.gallery) && prop.gallery.length > 0, `Gallery for ${prop.title} must be non-empty`);
      assert.ok(Array.isArray(prop.amenities) && prop.amenities.length > 0, `Amenities for ${prop.title} must be non-empty`);
    }
  });

  test("every CRM lead has qualified budget and valid pipeline stage", () => {
    const validStages = ["NEW", "CONTACTED", "QUALIFIED", "VIEWING_SCHEDULED", "NEGOTIATION", "OFFER_SUBMITTED", "WON"];

    for (const lead of SEED_LEADS) {
      assert.ok(lead.name, "Lead must have a name");
      assert.ok(lead.email.includes("@"), "Lead must have a valid email");
      assert.ok(validStages.includes(lead.stage), `Lead ${lead.name} has invalid stage ${lead.stage}`);
      assert.ok(lead.budget >= 1_000_000, `Lead ${lead.name} should have qualified budget`);
      assert.ok(lead.score >= 0 && lead.score <= 100, `Lead score must be between 0 and 100`);
    }
  });

  test("every monograph report has title, summary, and valid coverImage", () => {
    for (const mono of SEED_MONOGRAPHS) {
      assert.ok(mono.title, "Monograph must have a title");
      assert.ok(mono.slug, "Monograph must have a slug");
      assert.ok(mono.summary, "Monograph must have a summary");
      assert.ok(mono.coverImage && mono.coverImage.startsWith("http"), "Cover image must be a valid URL");
      assert.ok(mono.publishedAt, "Monograph must have a published date");
    }
  });
});
