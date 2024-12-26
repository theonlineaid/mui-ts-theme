interface FlattenItem {
  [key: string]: any;
  children?: FlattenItem[];
}

export default function flattenArray(list: FlattenItem[], key: string = 'children'): FlattenItem[] {
  let children: FlattenItem[] = [];

  const flatten = list?.map((item) => {
    if (item[key] && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(children.length ? flattenArray(children, key) : children);
}
