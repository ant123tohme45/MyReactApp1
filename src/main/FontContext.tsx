import React from 'react';

type FontWeights = 'regular' | 'medium' | 'bold';
type FontStyles = 'normal' | 'italic';

interface FontContextType {
  fontFamily: string;
  fontWeight: FontWeights;
  fontStyle?: FontStyles;
}

export const FontContext = React.createContext<FontContextType>({
  fontFamily: 'Poppins',
  fontWeight: 'regular',
  fontStyle: 'normal',
});

export const FontProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <FontContext.Provider
      value={{
        fontFamily: 'Poppins',
        fontWeight: 'regular',
        fontStyle: 'normal',
      }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFonts = () => React.useContext(FontContext);
