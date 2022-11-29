import groupBy from 'lodash/groupBy';

const replaceName = (name) => name.split(' ').join('-');

const formatLayout = (layout, groupByKey) => {
  const grouped = groupBy(layout, groupByKey);

  return Object.entries(grouped).map(([key, entry]) => {
    const groupedByCategory = groupBy(entry, 'subCategory');

    return {
      category: key,
      categoryId: replaceName(key),
      childrenForm: Object.entries(groupedByCategory).map(([subCategoryName, actions]) => ({
        subCategoryName,
        subCategoryId: replaceName(subCategoryName),
        actions,
      })),
    };
  });
};

export default formatLayout;
