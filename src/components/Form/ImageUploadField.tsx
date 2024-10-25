
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { CiImageOn } from "react-icons/ci";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ImageUploadField({
	maxNumber = 10,
	images,
	setImages
}: {
	maxNumber?: number;
	images: any[];
	setImages: Function;
}) {

	function onChange(imageList: ImageListType, addUpdateIndex: number[] | undefined) {

		setImages(imageList as never[]);

	}

	function swapImage(idx1: number, idx2: number) {

		if (idx1 >= images.length || idx1 < 0 || idx2 >= images.length || idx2 < 0) return

		let newData = [...images]
		let temp = newData[idx1];
		newData[idx1] = newData[idx2];
		newData[idx2] = temp;

		setImages(newData)

	}

	return (

		<div className="flex place-content-center w-full">
			<div className="w-full">
				<div className="label">
					<span className="text-sm text-rose-600">{"Pet images "}</span>
					<span className="text-sm text-rose-600">
						{images.length} / {maxNumber}
					</span>
				</div>
				<ImageUploading
					multiple
					value={images}
					onChange={onChange}
					maxNumber={maxNumber}
				>
					{({
						imageList,
						onImageUpload,
						onImageRemoveAll,
						onImageUpdate,
						onImageRemove,
						isDragging,
						dragProps,
					}) => (

						<div className="w-full">
							<div
								className={
									"flex items-center border w-full h-48 gap-3 p-3 rounded-lg border-black overflow-x-auto transition-colors " +
									(isDragging && "bg-indigo-100")
								}
								{...dragProps}
							>
								{imageList.length == 0 && (
									<div className="flex flex-col w-full justify-center items-center text-center text-slate-700">
										<CiImageOn className="w-8 h-8 text-slate-700" />
										Drop pet images here
									</div>
								)}

								<div className="flex flex-nowarp gap-4">

									{imageList.map((image, index) => (

										<div
											key={index}
											className="flex flex-col flex-none w-fit gap-2"
										>
											<img
												src={image.dataURL}
												alt=""
												className="object-cover w-32 h-32"
											/>

											<div className="image-item__btn-wrapper gap-2">

												{
													(index !== 0) ? <button type="button" onClick={() => swapImage(index, index - 1)} className="p-1 rounded-md transition-colors hover:bg-indigo-200">
														<IoCaretBackOutline className="w-4 h-4" />
													</button> :
														<button type="button" className="p-1 rounded-md transition-colors text-gray-300" disabled>
															<IoCaretBackOutline className="w-4 h-4" />
														</button>
												}

												<button type="button" onClick={() => onImageRemove(index)} className="p-1 rounded-md transition-colors hover:bg-red-200">
													<RiDeleteBin6Line className="w-4 h-4" />
												</button>

												{
													(index !== images.length - 1) ? <button type="button" onClick={() => swapImage(index, index + 1)} className="p-1 rounded-md transition-colors hover:bg-indigo-200">
														<IoCaretForwardOutline className="w-4 h-4" />
													</button> :
														<button type="button" className="p-1 rounded-md transition-colors text-gray-300" disabled>
															<IoCaretForwardOutline className="w-4 h-4" />
														</button>
												}

											</div>

										</div>

									))}

								</div>

							</div>


						</div>
					)}

				</ImageUploading>
			</div>

		</div>

	)


}