import { useState, type ReactNode } from 'react';

interface NavbarThemeProps {
  logo1?: ReactNode; // The '?' tells TypeScript this is optional
  logo2?: ReactNode;
  logo3?: ReactNode;
  logo4?: ReactNode;
  children?: ReactNode;
}

const NavbarThemeWrapper = ({
  logo1,
  logo2,
  logo3,
  logo4,
  children,
}: NavbarThemeProps) => {
  const [theme, setTheme] = useState<'style1' | 'style2' | 'style3' | 'style4'>(
    'style1',
  );
  const themeConfig = {
    style1: {
      bg: 'bg-[#FFFFF0] bg-[radial-gradient(at_0%_0%,_hsla(39,47%,85%,1)_0,_transparent_50%),_radial-gradient(at_100%_100%,_hsla(39,47%,85%,0.6)_0,_transparent_50%)]',
      activeLogo: 'logo1',
    },
    style2: { bg: 'bg-deeper-teal', activeLogo: 'logo2' },
    style3: { bg: 'bg-[#7bc1d1]', activeLogo: 'logo3' },
    style4: { bg: 'bg-ivory', activeLogo: 'logo4' },
  };
  const currentTheme = themeConfig[theme] || themeConfig.style1;
  return (
    <header
      className={`navbar w-full shadow-md transition-colors duration-30 ${currentTheme.bg}`}
    >
      <nav className="w-full flex justify-between  items-center px-4 py-1">
        {/* Left Side: Dynamic Logo slot */}
        <div className="flex mt-8">
          <a href="#" className="flex items-center">
            <div
              className={
                currentTheme.activeLogo === 'logo1' ? 'block' : 'hidden'
              }
            >
              {logo1}
            </div>

            <div
              className={
                currentTheme.activeLogo === 'logo2' ? 'block' : 'hidden'
              }
            >
              {logo2}
            </div>

            <div
              className={
                currentTheme.activeLogo === 'logo3' ? 'block' : 'hidden'
              }
            >
              {logo3}
            </div>
            <div
              className={
                currentTheme.activeLogo === 'logo4' ? 'block' : 'hidden'
              }
            >
              {logo4}
            </div>
          </a>
        </div>
        {/* Floating Developer/Client Selector */}
        <div className="ml-2  bg-white/80 rounded  text-xs text-black z-50">
          <select
            value={theme}
            onChange={(e) =>
              setTheme(e.target.value as 'style1' | 'style2' | 'style3')
            }
            className="p-1 border rounded bg-white text-black cursor-pointer"
          >
            <option value="style1">Ivory Mesh</option>
            <option value="style2">Deep Teal</option>
            <option value="style3">Light Blue</option>
            <option value="style4">Ivory</option>
          </select>
        </div>

        {/* Center/Right Side: Your entire existing Astro Navbar layout */}
        {children}
      </nav>
    </header>
  );
};

export default NavbarThemeWrapper;
