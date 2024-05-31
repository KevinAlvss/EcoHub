import { createContext, useState, ReactNode, useContext } from 'react'

type LatitudeLongitude = {
    lat: number;
    long: number;
}

type LocationContextData = {
    location: LatitudeLongitude | undefined;
    setLocation: (location: LatitudeLongitude) => any;
}

export const LocationContext = createContext({} as LocationContextData);

type LocationContextProviderProps = {
    children: ReactNode;
}

export function LocationContextProvider({children}: LocationContextProviderProps){
    const [location, setLocation] = useState<LatitudeLongitude>();

    return(
        <LocationContext.Provider value={{
            location,
            setLocation
        }}>
            {children}
        </LocationContext.Provider>
    )
}


export const useLocation = () => {
    return useContext(LocationContext);
}