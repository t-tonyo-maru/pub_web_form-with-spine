import * as spine from '@esotericsoftware/spine-webgl'
import { Form } from '../modules/form'

export class SpineApp implements spine.SpineCanvasApp {
  private skeleton: unknown // type: spine.Skeleton
  private state: unknown // type: spine.AnimationState
  private pixelRatio: number = window.devicePixelRatio || 1
  private animations: spine.TrackEntry[]
  private form: Form
  private centerNum: number = 15

  constructor({ form }: { form: Form }) {
    this.form = form
    this.animations = []
  }

  loadAssets = (canvas: spine.SpineCanvas) => {
    // atlasファイルをロード
    canvas.assetManager.loadTextureAtlas('model.atlas')
    // skeletonをロード
    canvas.assetManager.loadJson('model.json')
  }

  initialize = (canvas: spine.SpineCanvas) => {
    // spine アセットマネージャーを取得
    const assetManager = canvas.assetManager

    // テクスチャアトラスを生成
    const atlas = canvas.assetManager.require('model.atlas')
    // AtlasAttachmentLoader インスタンスを生成
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas)
    // skeletonを読み込むためのオブジェクトを生成
    const skeltonJson = new spine.SkeletonJson(atlasLoader)
    // skeleton情報を読み込み
    const skeltonData = skeltonJson.readSkeletonData(assetManager.require('model.json'))
    // skeletonインスタンスを生成してメンバにセット
    this.skeleton = new spine.Skeleton(skeltonData)

    if (!(this.skeleton instanceof spine.Skeleton)) return
    // skeletonの大きさを等倍にセット
    this.skeleton.scaleX = 0.7 * this.pixelRatio
    this.skeleton.scaleY = 0.7 * this.pixelRatio
    // skeletonの位置をセット
    this.skeleton.x = 0
    this.skeleton.y = (-1 * Math.floor(this.skeleton.data.height * 1.06 * this.pixelRatio)) / 2

    // アニメーション情報を取得
    const stateData = new spine.AnimationStateData(skeltonData)
    // デフォルトのMixをセット
    stateData.defaultMix = 0.1
    // アニメーションをセット
    this.state = new spine.AnimationState(stateData)
    if (!(this.state instanceof spine.AnimationState)) return
    this.animations.push(this.state.setAnimation(0, 'idle', true))
    this.animations.push(this.state.setAnimation(1, 'look_down_r', true))
    this.animations.push(this.state.setAnimation(2, 'look_down_l', true))

    // look_down_r, look_down_lのアルファ値を0にする
    this.animations.forEach((animation, index) => {
      if (index !== 0) animation.alpha = 0
    })

    // アニメーション完了後にコールバックを設定
    const listener: spine.AnimationStateListener = {
      complete: (entry: spine.TrackEntry) => {
        if (!(this.state instanceof spine.AnimationState)) return
        if (entry.trackIndex !== 4) return
        this.state.clearTrack(4)

        // 初回入力以降
        if (!this.form.getIsDoneInitialInput()) return
        this.state.setEmptyAnimation(5)
        this.state.setEmptyAnimation(6)
        if (this.form.getIsValidUserName() && this.form.getIsValidPassword()) {
          this.state.setAnimation(5, 'laugh', false)
          this.state.setAnimation(6, 'kazari', true)
        } else {
          this.state.setAnimation(5, 'disappointed', false)
        }
      }
    }
    this.state.addListener(listener)

    // ユーザーネームのinput要素にイベントを設定
    // focus
    this.form.getInputUserNameEl().addEventListener('focus', () => {
      if (!(this.state instanceof spine.AnimationState)) return
      this.state.setEmptyAnimation(5)
      this.state.setEmptyAnimation(6)
    })
    // blur
    this.form.getInputUserNameEl().addEventListener('blur', () => {
      if (!(this.state instanceof spine.AnimationState)) return

      const shakeHeadAnimation = this.form.getIsValidUserName()
        ? this.state.setAnimation(4, 'shake_head_v', false)
        : this.state.setAnimation(4, 'shake_head_h', false)
    })

    // パスワードのinput要素にイベントを設定
    // focus
    this.form.getInputPasswordEl().addEventListener('focus', () => {
      if (!(this.state instanceof spine.AnimationState)) return
      this.state.setEmptyAnimation(5)
      this.state.setEmptyAnimation(6)
      this.animations[1].alpha = this.animations[2].alpha = 0
      this.state.setAnimation(3, 'close_eye', false)
    })
    // blur
    this.form.getInputPasswordEl().addEventListener('blur', () => {
      if (!(this.state instanceof spine.AnimationState)) return
      this.state.clearTrack(3)

      const shakeHeadAnimation = this.form.getIsValidPassword()
        ? this.state.setAnimation(4, 'shake_head_v', false)
        : this.state.setAnimation(4, 'shake_head_h', false)
    })

    this.state.apply(this.skeleton)
    this.skeleton.updateWorldTransform()
  }

  update = (canvas: spine.SpineCanvas, delta: number) => {
    if (!(this.skeleton instanceof spine.Skeleton)) return
    if (!(this.state instanceof spine.AnimationState)) return

    // ユーザーネーム入力アニメーション
    if (this.form.getIsFocusUserNameEl()) {
      // ユーザーネーム入力中の場合
      const max = this.centerNum * 2
      const min = 0
      const caretPosition = this.form.getUserNameValue().length / max - min

      this.animations[1].alpha = caretPosition >= 1 ? 1 : caretPosition
      this.animations[2].alpha = 1 - caretPosition <= 0 ? 0 : 1 - caretPosition
    } else {
      // ユーザーネームを入力していない場合
      this.animations[1].alpha = this.animations[2].alpha = 0
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
    // 画面リサイズ（ブラウザサイズが変更された時の対応）
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
    console.log('error!!')
    console.log(canvas)
  }
}
