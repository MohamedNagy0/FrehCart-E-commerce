import notFoundImg from "../../assets/images/notfound.jpg";

export default function NotFound() {
    return (
        <>
            <img
                src={notFoundImg}
                alt="not Found Img"
                className="mx-auto w-1/2 mt-48"
            />
        </>
    );
}
