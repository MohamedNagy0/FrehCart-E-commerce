import { MdOutlineWifiOff } from "react-icons/md";

export default function MyOffline() {
    return (
        <>
            <section>
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <MdOutlineWifiOff className="text-9xl text-primary" />
                    </div>
                    <footer className="text-center mt-4">
                        <h2 className="font-bold text-xl">Whoopps!</h2>
                        <p className="mt-4">
                            No internet connection found. <br /> Please check
                            your connection or try again
                        </p>
                        <h3 className="mt-6">
                            <button
                                onClick={() => {
                                    location.reload();
                                }}
                                className="border px-8 font-bold  border-primary py-1 text-primary rounded-3xl "
                            >
                                Refresh
                            </button>
                        </h3>
                    </footer>
                </div>
            </section>
        </>
    );
}
