import { NextComponentType } from 'next'

const VipTag: NextComponentType = () => {
  return (
    <div className="card w-full bg-gray-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-between">
          <div>开通黑胶VIP</div>
          <button className="btn btn-xs btn-active btn-ghost">会员中心</button>
        </h2>
        <p>立享超21项专属特权</p>
        <div className="card-actions justify-end">受邀专享，黑胶VIP首月仅3.99元</div>
      </div>
    </div>
  )
}

export default VipTag
