import { rgb } from 'd3-color';
import { SortByType } from '@keen.io/ui-core';

export const firstCapital = (str: string) => {
  return str.replace(/^\w/, (c: string) => c.toUpperCase());
};

export const hexRgb = (hex: string, opacity: number) => {
  const newColor = rgb(hex);
  newColor.opacity = opacity;
  return newColor.toString();
};

export const sortData = (data: any[], sortBy: SortByType) => {
  return data.sort((a: any, b: any) => {
    const nameA = a[sortBy.property];
    const nameB = b[sortBy.property];
    if (nameA < nameB) return sortBy.sort === 'asc' ? -1 : 1;
    if (nameA > nameB) return sortBy.sort === 'desc' ? -1 : 1;
    return 0;
  });
};

export const copyToClipboard = (value: any) => {
  const placeholder = document.createElement('input');
  placeholder.value = value;
  document.body.appendChild(placeholder);
  placeholder.select();
  document.execCommand('copy');
  document.body.removeChild(placeholder);
};
