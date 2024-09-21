import MediaGalleryForm from "@/components/forms/media-gallery"
import AboutRemoveButton from "@/components/global/about-remove-button"
import { GlassModal } from "@/components/global/glass-modal"
import { Card, CardContent } from "@/components/ui/card"
import { useMediaGallery } from "@/hooks/groups"
import { BadgePlus } from "@/icons"
import { validateURLString } from "@/lib/utils"
import { toast } from "sonner"
type Props = {
	gallery: string[]
	groupid: string

	onActive(media: { url: string | undefined; type: string }): void
	userid: string
	groupUserid: string
}
const MediaGallery = ({
	gallery,
	groupUserid,
	onActive,
	groupid,
	userid,
}: Props) => {
	const { removeGalleryItem, isPending } = useMediaGallery(groupid)
	const handleRemove = (mediaUrl: string) => {
		toast(
			<div>
				<p>Are you sure you want to remove this item?</p>
				<div className="mt-2 flex gap-2 justify-end">
					<button
						className="px-4 py-2 text-white bg-red-600 rounded"
						onClick={() => {
							removeGalleryItem(mediaUrl) // Call the remove function
							toast.dismiss() // Close the toast
						}}
					>
						Remove
					</button>
					<button
						className="px-4 py-2 text-white bg-gray-500 rounded"
						onClick={() => toast.dismiss()}
					>
						Cancel
					</button>
				</div>
			</div>,
			{ duration: Infinity }, // Keep the toast open until the user interacts
		)
	}
	return (
		<div className="flex justify-start gap-3 flex-wrap">
			{gallery.length > 0 &&
				gallery.map((gal, key) => (
					<div key={key} className="relative w-36 aspect-video">
						{/* Image Render */}
						{validateURLString(gal).type === "IMAGE" ? (
							<img
								onClick={() =>
									onActive({
										url: gal,
										type: "IMAGE",
									})
								}
								src={`https://ucarecdn.com/${gal}/`}
								alt="gallery-img"
								className="rounded-xl cursor-pointer opacity-70 w-full h-full"
							/>
						) : (
							// Video Render (Loom / YouTube)
							<iframe
								src={gal}
								className="absolute outline-none border-0 top-0 left-0 w-full h-full rounded-xl"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							></iframe>
						)}

						{/* Remove Button */}
						{userid === groupUserid && (
							<AboutRemoveButton
								userid={userid}
								onRemove={() => handleRemove(gal)}
								groupUserid={groupUserid}
								disabled={isPending}
							/>
						)}
					</div>
				))}

			{userid === groupUserid ? (
				<GlassModal
					title="Add media to VSL"
					description={
						<>
							Paste an <strong className="text-red-500">embedded</strong> link to a YouTube or Loom video. <br />
							<strong>Example:</strong> <br />
							YouTube: <em>https://www.youtube.com/embed/your-video-id</em>{" "}
							<br />
							Loom: <em>https://www.loom.com/embed/your-video-id</em>
						</>
					}
					trigger={
						<Card className="border-dashed border-themeGray hover:bg-themeBlack bg-transparent cursor-pointer">
							<CardContent className="flex justify-center items-center py-10 px-16">
								<BadgePlus />
							</CardContent>
						</Card>
					}
				>
					<MediaGalleryForm groupid={groupid} />
				</GlassModal>
			) : null}
		</div>
	)
}

export default MediaGallery
