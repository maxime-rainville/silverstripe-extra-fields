declare module 'lib/Injector' {
  const reducer: any;
  const component: any;

  export const loadComponent: (name: string, context: any) => any;
}
