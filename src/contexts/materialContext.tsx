import { createContext, useState, ReactNode, useContext } from 'react'

export enum MaterialType  {
    "lamp"
    ,"batery"
    ,"eletronic"
    ,"organic"
    ,"paper"
    ,"oil"
}

type materialContextData = {
    materialTypes: MaterialType[];
    handleMaterialType: (materialType: MaterialType) => MaterialType[]
}

export const MaterialContext = createContext({} as materialContextData);

type MaterialContextProviderProps = {
    children: ReactNode;
}

export function MaterialContextProvider({children}: MaterialContextProviderProps){
    const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([]);

    const handleMaterialType = (material: MaterialType) => {
        if(materialTypes.includes(material)){
            setMaterialTypes(materialTypes.filter(m => m !== material))            
            return materialTypes;
        }

        setMaterialTypes([...materialTypes, material]);
        return materialTypes;
    }

    return(
        <MaterialContext.Provider value={{
            materialTypes,
            handleMaterialType
        }}>
            {children}
        </MaterialContext.Provider>
    )
}


export const useMaterial = () => {
    return useContext(MaterialContext);
}