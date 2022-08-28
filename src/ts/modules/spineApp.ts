import * as spine from '@esotericsoftware/spine-webgl'
import { Form } from '../modules/form'

export class SpineApp implements spine.SpineCanvasApp {
  private skeleton: unknown // type: spine.Skeleton
  private state: unknown // type: spine.AnimationState
  private pixelRatio: number = window.devicePixelRatio || 1
  private animations: spine.TrackEntry[]
  private form: Form
  private valueCenterNum: number = 15

  constructor({ form }: { form: Form }) {
    this.form = form
    this.animations = []
  }

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
    const skeltonData = skeltonJson.readSkeletonData(assetManager.require('model.json'))
    // skeleton インスタンスを生成して、メンバにセット
    this.skeleton = new spine.Skeleton(skeltonData)

    if (!(this.skeleton instanceof spine.Skeleton)) return
    // skeleton の大きさを等倍にセット
    this.skeleton.scaleX = 0.7 * this.pixelRatio
    this.skeleton.scaleY = 0.7 * this.pixelRatio
    // skeleton の位置をセット
    this.skeleton.x = 0
    this.skeleton.y = (-1 * Math.floor(this.skeleton.data.height * 1.06 * this.pixelRatio)) / 2

    // skeleton 情報からアニメーション情報を取得
    const stateData = new spine.AnimationStateData(skeltonData)
    // アニメーションをセット
    this.state = new spine.AnimationState(stateData)
    if (!(this.state instanceof spine.AnimationState)) return
    this.animations.push(this.state.setAnimation(0, 'idle', true))
    this.animations.push(this.state.setAnimation(1, 'look_down_r', true))
    this.animations.push(this.state.setAnimation(2, 'look_down_l', true))

    // close_eye
    // disappointed
    // laugh
    // shake_head_h
    // shake_head_v
    // kazari

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
        if (this.form.getIsValidUserId() && this.form.getIsValidPassword()) {
          this.state.setEmptyAnimation(5)
          console.log('hogehogehoge')
        } else {
          this.state.setAnimation(5, 'disappointed', false)
        }
      }
    }
    this.state.addListener(listener)

    // ユーザーIDのinput要素にイベントを設設定
    // focus
    this.form.getInputUserIdEl().addEventListener('focus', () => {
      if (!(this.state instanceof spine.AnimationState)) return
      this.state.setEmptyAnimation(5)
    })
    // blur
    this.form.getInputUserIdEl().addEventListener('blur', () => {
      if (!(this.state instanceof spine.AnimationState)) return

      if (this.form.getIsValidUserId()) {
        this.state.setAnimation(4, 'shake_head_v', false)
      } else {
        this.state.setAnimation(4, 'shake_head_h', false)
      }
    })

    // パスワードのinput要素にイベントを設設定
    // focus
    this.form.getInputPasswordEl().addEventListener('focus', () => {
      if (!(this.state instanceof spine.AnimationState)) return
      // this.state.setEmptyAnimation(5)
      this.animations[1].alpha = this.animations[2].alpha = 0
      this.state.setAnimation(3, 'close_eye', true)
    })
    // blur
    this.form.getInputPasswordEl().addEventListener('blur', () => {
      if (!(this.state instanceof spine.AnimationState)) return
      this.state.clearTrack(3)

      if (this.form.getIsValidPassword()) {
        this.state.setAnimation(4, 'shake_head_v', false)
      } else {
        this.state.setAnimation(4, 'shake_head_h', false)
      }
    })

    this.state.apply(this.skeleton)
    this.skeleton.updateWorldTransform()
  }

  update = (canvas: spine.SpineCanvas, delta: number) => {
    if (!(this.skeleton instanceof spine.Skeleton)) return
    if (!(this.state instanceof spine.AnimationState)) return

    // アニメーションを更新
    this.switchAnimation({ state: this.state })
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
    // エラーがあれば、以降が発火する
    console.log('error!!')
    console.log(canvas)
  }

  switchAnimation = ({ state }: { state: spine.AnimationState }) => {
    // ユーザーID / パスワード入力アニメーション
    if (this.form.getIsFocusUserIdEl()) {
      const max = this.valueCenterNum * 2
      const min = 0
      const cursorPosition = this.form.getUserIdValue().length / max - min

      this.animations[1].alpha = cursorPosition >= 1 ? 1 : cursorPosition
      this.animations[2].alpha = 1 - cursorPosition <= 0 ? 0 : 1 - cursorPosition
    } else {
      this.animations[1].alpha = this.animations[2].alpha = 0
    }
  }
}
