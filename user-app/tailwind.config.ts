import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'brown': '#C70039',
        'orangered': '#FF4500',		
			  'grey': '#808080',	
        'gray': '#BEBEBE',
      },
    },
  },
  plugins: [],
} satisfies Config;
