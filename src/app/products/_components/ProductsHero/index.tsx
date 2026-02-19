import Image from "next/image";

const ProductsHero = () => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-[#dbe6ff] bg-gradient-to-r from-[#eaf2ff] via-[#edf3ff] to-[#f3f7ff] p-5 lg:p-7">
            <div className="relative z-10 max-w-[640px]">
                <h1 className="text-2xl font-semibold text-[#1c4c9d] lg:text-[42px] lg:leading-[1.05]">Find Your Dream Property or Vehicle</h1>
                <p className="mt-3 text-sm text-[#6a7da2] lg:text-base">
                    Browse our wide selection of cars and properties. Use the filters below to find exactly what you are looking for.
                </p>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block">
                <Image src="/images/city-buildings.png" alt="Property" fill className="object-cover object-center opacity-90" />
            </div>
        </div>
    );
};

export default ProductsHero;
