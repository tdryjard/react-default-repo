import React, { Dispatch, SetStateAction, LegacyRef } from 'react'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useTranslation } from 'react-i18next'

export type UploadImageProps = {
  fileList: UploadFile[]
  setFileList: Dispatch<SetStateAction<UploadFile[]>>
  maxImages: number
}

const UploadImage = ({ fileList, setFileList, maxImages }: UploadImageProps) => {
  const { t } = useTranslation()

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <ImgCrop rotate>
      <Upload
        beforeUpload={() => false}
        id="upload-image"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < maxImages && `+ ${t('import')}`}
      </Upload>
    </ImgCrop>
  )
}

export default UploadImage
