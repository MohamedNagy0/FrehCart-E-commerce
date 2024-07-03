export default function Title({ name }) {
    return (
        <>
            <div className="title flex justify-center">
                <h2 className="text-sky-950 p-2 relative text-3xl after:w-1/2 after:h-[3px] after:-translate-x-1/2 after:bg-primary after:absolute after:left-1/2 after:top-full font-bold text-center my-12">
                    {name}
                </h2>
            </div>
        </>
    );
}
