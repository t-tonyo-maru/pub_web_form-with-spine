import * as spine from '@esotericsoftware/spine-webgl'
import { Form } from '../modules/Form'

export class SpineApp implements spine.SpineCanvasApp {
  private skeleton: unknown // type: spine.Skeleton
  private state: unknown // type: spine.AnimationState
  private pixelRatio: number = window.devicePixelRatio || 1

  // constructor() {}

  loadAssets = (canvas: spine.SpineCanvas) => {
    // atlas ファイルをロード
    canvas.assetManager.loadTextureAtlas('model.atlas')
    // skeleton(json 形式) をロード
    canvas.assetManager.loadJson('model.json')
  }

  initialize = (canvas: spine.SpineCanvas) => {
    // spine のアセットマネージャーを取得
    const assetManager = canvas.assetManager

    // テクスチャアトラスを生成
    const atlas = canvas.assetManager.require('model.atlas')
    // AtlasAttachmentLoader（リージョン、メッシュ、バウンディングボックス、パスのアタッチメントを解決するための要素）のインスタンスを生成
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas)
    // skeleton(json 形式) を読み込むためのオブジェクトを生成
    const skeltonJson = new spine.SkeletonJson(atlasLoader)
    // skeleton 情報を読み込み
    const skeltonData = skeltonJson.readSkeletonData(
      assetManager.require('model.json')
    )
    // skeleton インスタンスを生成して、メンバにセット
    this.skeleton = new spine.Skeleton(skeltonData)

    if (this.skeleton instanceof spine.Skeleton) {
      // skeleton の大きさを等倍にセット
      this.skeleton.scaleX = 0.7 * this.pixelRatio
      this.skeleton.scaleY = 0.7 * this.pixelRatio
      // skeleton の位置をセット
      this.skeleton.x = 0
      this.skeleton.y =
        (-1 * Math.floor(this.skeleton.data.height * 1.06 * this.pixelRatio)) /
        2
    }

    // skeleton 情報からアニメーション情報を取得
    const stateData = new spine.AnimationStateData(skeltonData)
    // アニメーションをセット
    this.state = new spine.AnimationState(stateData)
    if (this.state instanceof spine.AnimationState) {
      this.state.setAnimation(0, 'idle', true)
    }
  }

  update = (canvas: spine.SpineCanvas, delta: number) => {
    if (!(this.skeleton instanceof spine.Skeleton)) return
    if (!(this.state instanceof spine.AnimationState)) return

    // 画面の中心
    const center = {
      x: canvas.gl.drawingBufferWidth / this.pixelRatio / 2,
      y: canvas.gl.drawingBufferHeight / this.pixelRatio / 2
    }
    // 画面の中心・マウス位置のベクトルを算出
    const vecPositoin = {
      x: canvas.input.mouseX - center.x,
      y: canvas.input.mouseY - center.y
    }
    // ベクトルのサイズを取得
    const vecSize = Math.sqrt(vecPositoin.x ** 2 + vecPositoin.y ** 2)
    // ベクトルを正規化
    const vecNormalize = {
      x: vecPositoin.x / vecSize,
      y: vecPositoin.y / vecSize
    }

    // アニメーションを更新
    this.state.update(delta)
    this.state.apply(this.skeleton)
    this.skeleton.updateWorldTransform()
  }

  render = (canvas: spine.SpineCanvas) => {
    if (!(this.skeleton instanceof spine.Skeleton)) return

    // レンダラーを取得
    const renderer = canvas.renderer

    // 画面リサイズ。（ブラウザサイズが変更された時の対応）
    renderer.resize(spine.ResizeMode.Expand)
    // 画面クリア
    canvas.clear(0.2, 0.2, 0.2, 1)
    // 描画開始
    renderer.begin()
    // skeleton を描画
    renderer.drawSkeleton(this.skeleton)
    // 描画終了
    renderer.end()
  }

  error = (canvas: spine.SpineCanvas) => {
    // エラーがあれば、以降が発火する
    console.log('error!!')
    console.log(canvas)
  }
}
