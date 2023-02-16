/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
namespace MYCOMPONENT {
  type MyInputPropsType = {
    classNameInput?: string
    classNameSpan?: string
    placeholder: string
    labelName?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
    rules?: {
      required?: boolean
      message?: string
    }[]
  }
}