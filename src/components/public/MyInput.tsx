import { NextComponentType } from 'next'

const MyInput: NextComponentType<{}, {}, MYCOMPONENT.MyInputPropsType> = (props) => {
  const classNameInput = props.classNameInput ? props.classNameInput : 'input input-bordered w-3/5'
  const classNameSpan = props.classNameSpan ? props.classNameSpan : 'w-2/5'
  const unqualified = props.rules?.filter((item) => !item.required)[0]

  return (
    <div className="w-full">
      <label className="input-group relative w-full">
        {props.labelName && <span className={classNameSpan}>{props.labelName}</span>}
        <input type="text" className={classNameInput} placeholder={props.placeholder} onChange={props.onChange} />
      </label>
      {!unqualified?.required && <div className="text-blue-600 absolute left-14">{unqualified?.message}</div>}
    </div>
  )
}

export default MyInput
