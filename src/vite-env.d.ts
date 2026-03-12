/// <reference types="vite/client" />

declare module 'react' {
  const React: any
  export = React
  export default React
  export const useState: any
  export const useRef: any
  export const useEffect: any
  export const useMemo: any
  export const useCallback: any
  export const useContext: any
  export const useReducer: any
  export const createContext: any
  export const useContext: any
  export namespace React {
    type ReactNode = any
    type ComponentType<P = {}> = any
  }
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any
  export function jsxs(type: any, props: any, key?: any): any
  export function Fragment(props: { children?: any }): any
}

declare module 'motion/react' {
  export const motion: any
  export const AnimatePresence: any
  export function useReducedMotion(): boolean
  export function useInView(ref: any, options?: any): boolean
  export function useMotionValue(initial: any): any
  export function useSpring(source: any, config?: any): any
  export function useTransform(source: any, input: any[], output: any[]): any
}

declare namespace React {
  type ReactNode = any
  type ComponentType<P = {}> = any
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}
