import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";

export function getCategory(type: FilterType) {
  if (type == FilterType.MUG) return "mugs";
  if (type == FilterType.SHIRT) return "t-shirts";
  return "";
}

export function getPriority(priority: PriorityTypes) {
  if (priority == PriorityTypes.NEWS)
    return { field: "created_at", order: "ASC" };
  if (priority == PriorityTypes.BIGGEST_PRICE)
    return { field: "price_in_cents", order: "DSC" };
  if (priority == PriorityTypes.MINOR_PRICE)
    return { field: "price_in_cents", order: "ASC" };

  return { field: "sales", order: "DSC" };
}

export const query = (type: FilterType, priority: PriorityTypes) => {
  const categorySettings = getCategory(type);
  const prioritySettings = getPriority(priority);

  if (type == FilterType.ALL && priority === PriorityTypes.POPULARITY)
    return `query {
        allProducts(sortField: "sales", sortOrder: "DSC") {
          id
          name
          price_in_cents
          image_url
        }
      }
    `;

  return `
  query {
      allProducts(sortField: "${prioritySettings.field}", sortOrder: "${
    prioritySettings.order
  }", ${categorySettings ? `filter: { category: "${categorySettings}"}` : ""}) {
        id
        name
        price_in_cents
        image_url
        category
      }
    }
  `;
};
