export const emotionData = [
  { id: 0, text: "微笑" },
  { id: 1, text: "撇嘴" },
  { id: 2, text: "色" },
  { id: 3, text: "发呆" },
  { id: 4, text: "得意" },
  { id: 5, text: "流泪" },
  { id: 6, text: "害羞" },
  { id: 7, text: "闭嘴" },
  { id: 8, text: "睡" },
  { id: 9, text: "大哭" },
  { id: 10, text: "尴尬" },
  { id: 11, text: "发怒" },
  { id: 12, text: "调皮" },
  { id: 13, text: "呲牙" },
  { id: 14, text: "惊讶" },
  { id: 15, text: "难过" },
  { id: 16, text: "酷" },
  { id: 17, text: "冷汗" },
  { id: 18, text: "抓狂" },
  { id: 19, text: "吐" },
  { id: 20, text: "偷笑" },
  { id: 21, text: "可爱" },
  { id: 22, text: "白眼" },
  { id: 23, text: "傲慢" },
  { id: 24, text: "饥饿" },
  { id: 25, text: "困" },
  { id: 26, text: "惊恐" },
  { id: 27, text: "流汗" },
  { id: 28, text: "憨笑" },
  { id: 29, text: "大兵" },
  { id: 30, text: "奋斗" },
  { id: 31, text: "咒骂" },
  { id: 32, text: "疑问" },
  { id: 33, text: "嘘" },
  { id: 34, text: "晕" },
  { id: 35, text: "折磨" },
  { id: 36, text: "衰" },
  { id: 37, text: "骷髅" },
  { id: 38, text: "敲打" },
  { id: 39, text: "再见" },
  { id: 40, text: "擦汗" },
  { id: 41, text: "抠鼻" },
  { id: 42, text: "鼓掌" },
  { id: 43, text: "糗大了" },
  { id: 44, text: "坏笑" },
  { id: 45, text: "左哼哼" },
  { id: 46, text: "右哼哼" },
  { id: 47, text: "哈欠" },
  { id: 48, text: "鄙视" },
  { id: 49, text: "委屈" },
  { id: 50, text: "快哭了" },
  { id: 51, text: "阴险" },
  { id: 52, text: "亲亲" },
  { id: 53, text: "吓" },
  { id: 54, text: "可怜" },
  { id: 55, text: "菜刀" },
  { id: 56, text: "西瓜" },
  { id: 57, text: "啤酒" },
  { id: 58, text: "篮球" },
  { id: 59, text: "乒乓" },
  { id: 60, text: "咖啡" },
  { id: 61, text: "饭" },
  { id: 62, text: "猪头" },
  { id: 63, text: "玫瑰" },
  { id: 64, text: "凋谢" },
  { id: 65, text: "示爱" },
  { id: 66, text: "爱心" },
  { id: 67, text: "心碎" },
  { id: 68, text: "蛋糕" },
  { id: 69, text: "闪电" },
  { id: 70, text: "炸弹" },
  { id: 71, text: "刀" },
  { id: 72, text: "足球" },
  { id: 73, text: "瓢虫" },
  { id: 74, text: "便便" },
  { id: 75, text: "月亮" },
  { id: 76, text: "太阳" },
  { id: 77, text: "礼物" },
  { id: 78, text: "拥抱" },
  { id: 79, text: "强" },
  { id: 80, text: "弱" },
  { id: 81, text: "握手" },
  { id: 82, text: "胜利" },
  { id: 83, text: "抱拳" },
  { id: 84, text: "勾引" },
  { id: 85, text: "拳头" },
  { id: 86, text: "差劲" },
  { id: 87, text: "爱你" },
  { id: 88, text: "NO" },
  { id: 89, text: "OK" },
  { id: 90, text: "爱情" },
  { id: 91, text: "飞吻" },
  { id: 92, text: "跳跳" },
  { id: 93, text: "发抖" },
  { id: 94, text: "怄火" },
  { id: 95, text: "转圈" },
  { id: 96, text: "磕头" },
  { id: 97, text: "回头" },
  { id: 98, text: "跳绳" },
  { id: 99, text: "挥手" },
  { id: 100, text: "激动" },
  { id: 101, text: "街舞" },
  { id: 102, text: "献吻" },
  { id: 103, text: "左太极" },
  { id: 104, text: "右太极" },
];

export function getImgUrl(id) {
  return require("@/components/Emotion/emotionImgs/" + id + ".gif");
}

export function emotion(res) {
  const word = res.replace(/\[|\]/gi, "");
  let index = -1;
  emotionData.forEach((item) => {
    if (item.text === word) {
      index = item.id;
    }
  });
  if (index >= 0) {
    const url = getImgUrl(index);
    return `<img class="emoji-img" width="24" height="24" src="${url}" />`;
  }
}

export function replaceEmotionText(content) {
  return content
    .replace(/<\/?.+?>/g, "")
    .replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, emotion);
}

// export { emotionData, getImgUrl, replaceEmotionText }
