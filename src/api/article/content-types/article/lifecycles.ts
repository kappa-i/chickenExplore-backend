function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

async function ensureUniqueSlug(strapi: any, slug: string, documentId?: string): Promise<string> {
  let candidate = slug;
  let suffix = 2;

  while (true) {
    const filters: any = { slug: candidate };
    const existing = await strapi.documents('api::article.article').findMany({
      filters,
      limit: 1,
    });

    const conflict = existing.find((e: any) => e.documentId !== documentId);
    if (!conflict) return candidate;

    candidate = `${slug}-${suffix}`;
    suffix++;
  }
}

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (!data.slug && data.title) {
      data.slug = await ensureUniqueSlug(strapi, slugify(data.title));
    }
  },

  async beforeUpdate(event: any) {
    const { data, where } = event.params;
    if (!data.slug && data.title) {
      data.slug = await ensureUniqueSlug(strapi, slugify(data.title), where?.documentId);
    }
  },
};
