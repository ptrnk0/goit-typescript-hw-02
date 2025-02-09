import { Image } from "../../services/unsplashApi.types"

export type Props = {
    image: Image
    onOpenModal: (image: Image) => void;
}