import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleSection extends Struct.ComponentSchema {
  collectionName: 'components_article_sections';
  info: {
    displayName: 'section';
    icon: 'file-text';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
  };
}

export interface RecipeIngredient extends Struct.ComponentSchema {
  collectionName: 'components_recipe_ingredients';
  info: {
    displayName: 'ingredient';
    icon: 'restaurant';
  };
  attributes: {
    name: Schema.Attribute.String;
    quantity: Schema.Attribute.String;
  };
}

export interface RecipeStep extends Struct.ComponentSchema {
  collectionName: 'components_recipe_steps';
  info: {
    displayName: 'step';
  };
  attributes: {
    description: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article.section': ArticleSection;
      'recipe.ingredient': RecipeIngredient;
      'recipe.step': RecipeStep;
    }
  }
}
