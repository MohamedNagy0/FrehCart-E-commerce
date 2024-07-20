/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,

            screens: {
                sm: "640px",

                md: "720px",

                lg: "960px",

                xl: "1140px",

                "2xl": "1280",
            },
        },
        extend: {
            screens: {
                "md-850": "850px",
                xs: "470px",
            },
            boxShadow: {
                myShadow:
                    "rgba(145, 158, 171, 0.2) 0px 2px 4px -1px, rgba(145, 158, 171, 0.14) 0px 4px 5px 0px, rgba(145, 158, 171, 0.12) 0px 1px 10px 0px",
            },
            colors: {
                primary: "#09c",
                darkPrimary: "rgb(8, 47, 73)",
                lightPrimary: "rgb(2 173 227)",
                light: "#f0f3f2",
                rating: "#ffc908",
            },
            keyframes: {
                shake: {
                    "0%": { transform: "rotate(0deg)" },
                    "25%": { transform: "rotate(15deg)" },
                    "50%": { transform: "rotate(0deg)" },
                    "75%": { transform: "rotate(-15deg)" },
                    "100%": { transform: "rotate(0deg)" },
                },
                cart: {
                    "0%": { transform: "translateY(0)" },
                    "25%": { transform: "translateY(-7px)" },
                    "50%": { transform: "translateY(-2px)" },
                    "75%": { transform: "translateY(-7px)" },
                    "100%": { transform: "translateY(0)" },
                },
                userAsideAnimation: {
                    "0%": {
                        transform: "translateX(-100%)",
                    },
                    "25%": {
                        transform: "translateX(-60%)",
                    },
                    "50%": {
                        transform: "translateX(-40%)",
                    },
                    "75%": {
                        transform: "translateX(25px)",
                    },
                    "100%": {
                        transform: "translateX(-100%)",
                    },
                },
            },
            animation: {
                shake: "shake 300ms linear infinite forwards",
                cart: "cart 1s linear",
                pulse: "pulse 500ms cubic-bezier(0.4, 0, 0.6, 1) infinite",
                userAsideAnimation: "userAsideAnimation 1.5s linear",
            },
        },
    },
    plugins: [],
};
