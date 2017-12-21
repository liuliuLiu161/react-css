import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { EnLargeImgModal } from '../../components';
import {showDiaglog} from '../../redux/modules/diaglog';


const styles = require('./SelectPhoto.scss');

@connect(
  state => ({}), {
    pushState: push, showDiaglog
  }
)
export class SelectPhoto extends Component {
  static propTypes = {
    showDiaglog: PropTypes.func,
    loading: PropTypes.bool,
    location: PropTypes.object,
    pushState: PropTypes.func
  };

  constructor(props) {
    let imagesStr = sessionStorage.getItem('quickPayTreatmentImages');
    let imagesObj = [];
    if (imagesStr == ''){
      imagesObj = [];
    } else {
      imagesObj = JSON.parse(imagesStr);
    }
    super(props);
    this.state = {
      imgItems: imagesObj || [],
      imgItemsBase64: [],
      curLargeImg: null,
      showLargeImgModal: false,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  clickImg(paramCurMsg) {
    this.setState({
      curLargeImg: paramCurMsg,
      showLargeImgModal: true
    })
  }

  hideImg() {
    this.setState({
      curLargeImg: '',
      showLargeImgModal: false
    })
  }

  // 修改图片路径
  clickAddImgItem(event, key) {
    // if(this.state.imgItems && this.state.imgItems.length >= 9){
    //     this.props.showDiaglog('上传图片不得超过九张');
    // }
    const asd = event.target.value;
    console.log(asd, 'asd');

    const imageFiles = event.target.files;
    const {imgItems} = this.state;
    // 判断是否上重了图片
    // for (const imgItemsIndex in imgItems) {
    //     if (imgItems[imgItemsIndex].imgInputValue === curImgInputValue) {
    //         this.props.showDiaglog('已经有该图片, 请重新选择图片');
    //         return;
    //     }
    // }
    // 将图片转为base64 参考地址：http://final-elysion.cnblogs.com/p/6092675.html
    const curComponent = this;

    for (let ii = 0; ii < imageFiles.length; ii++){
      this.processfile(imageFiles[ii], ii, curComponent);
    }
  }

  // 将图片转为base64
  processfile(file, key, curComponent) {
    const reader = new FileReader();
    reader.onload = function readerLoad(event) {
      const blob = new Blob([event.target.result]);
      window.URL = window.URL || window.webkitURL;
      const blobURL = window.URL.createObjectURL(blob);
      const image = new Image();
      image.src = blobURL;

      image.onload = function imgOnload() {
        const base64ResizedImg = curComponent.resizeMe(image);
        if(curComponent.state.imgItems && curComponent.state.imgItems.length >= 9){
          curComponent.props.showDiaglog('上传图片不得超过9张');
          return;
        }
        curComponent.setState({
          imgItems: [...curComponent.state.imgItems, base64ResizedImg],
        });
      };
    };
    reader.readAsArrayBuffer(file);
  }

  // 压缩图片
  resizeMe(img) {
    //  压缩的大小
    const max_width = 1000;
    const max_height = 700;
    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;
    if (width > height && width > max_width) {
      height = Math.round(height *= max_width / width);
      width = max_width;
    } else if (height > max_height) {
      width = Math.round(width *= max_height / height);
      height = max_height;
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    //  压缩率
    return canvas.toDataURL('image/jpeg', 0.4);
  }

  delegateImage(index) {
    let imgItems = this.state.imgItems;
    imgItems.splice(index,1);//从start的位置开始向后删除delCount个元素
    this.setState({
      imgItems: imgItems,
    })
  }

  enlargeImage(index) {

  }


  clickUnableBtn() {
    this.props.showDiaglog('请选择图片');
    return;
  }

  clickUploadImage() {
    let ordercode = sessionStorage.getItem('quickPayOrderCode');
    let images = this.state.imgItems;
    console.log(images, 'imagesimages');
    if (images.length == 0) {
      this.props.showDiaglog('请选择上传图片');
    } else {
      this.props.showDiaglog('上传成功');
    }
  }


  render() {

    const shanchuimage = require('../../images/shanchuimage.png');
    const {imgItems} = this.state;

    return (
      <div className={styles.uploadInformation}>
        <EnLargeImgModal show={this.state.showLargeImgModal} hideImg={this.hideImg.bind(this)} curLargeImg={this.state.curLargeImg} />
        <div className={styles.details}>
          <p>资料</p>
          <textarea ref='tretmentDescription' placeholder="上传图片，描述情况.（选填）"></textarea>
        </div>

        <div className={styles.photo + ' clearfix'}>
          {
            imgItems && imgItems.map((image, index) => {
              return(
                <div className={styles.photodetail}>
                  <img className={styles.shanchuimage} src={shanchuimage} onClick={() => this.delegateImage(index)}/>
                  <img className={styles.uploadimage} src={image} onClick={() => this.clickImg(image)}/>
                </div>
              );
            })
          }
          <section>
            <label htmlFor="inputFile">
            </label>
            <input type="file" accept="image/*" multiple="multiple" id="shacuan"
                   onChange={this.clickAddImgItem.bind(this)} id="inputFile" />

          </section>
        </div>

        <footer>
          {
            this.state.imgItems.length == 0 ?
              <button className="btn trbtn unableBtn" onClick={this.clickUnableBtn.bind(this)}>上传</button>
              :
              <button className="btn trbtn" id="quedingbtn" onClick={this.clickUploadImage.bind(this)}>上传</button>
          }
        </footer>

      </div>
    );
  }
}

