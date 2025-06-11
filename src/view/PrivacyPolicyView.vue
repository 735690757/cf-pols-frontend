<script setup lang="ts">
import router from "../router";

const goToRouter = (url: string) => {
  router.push(url)
}
</script>

<template>
  <div class="privacyPolicy-core">
    <a-typography>
      <a-typography-title>隐私政策</a-typography-title>
      <a-typography-title :level="2">第一条 序言</a-typography-title>
      <a-typography-paragraph>
        1.1平台由瑞鸭信息技术发展有限责任公司开发运营，公司十分重视对用户个人信息的保护。
      </a-typography-paragraph>
      <a-typography-paragraph>
        1.2在您使用平台提供的服务时，平台可能会因为实际业务需要而收集和使用您的相关个人信息。平台希望通过本隐私政策向您清晰地介绍平台对您个人信息的处理方式（包括但不限于个人信息的收集、使用、保护等），请您仔细阅读，在需要时，根据本隐私政策的指引，做出您认为适当的选择。
      </a-typography-paragraph>
      <a-typography-paragraph>
        1.3当您登录平台即表示您接受本隐私政策的全部内容，并同意平台按本政策收集、使用和保护您的相关个人信息。
      </a-typography-paragraph>
      <a-typography-title :level="2">第二条 个人信息收集</a-typography-title>
      <a-typography-paragraph>
        您理解并同意，平台收集信息是为了向您提供更优质的服务，我们将根据合法、正当、必要的原则，仅收集实现业务功能所必要的信息，平台承诺绝不会收集任何与业务功能无关的个人信息和非必要信息。
      </a-typography-paragraph>
      <a-typography-paragraph>
        平台提供服务时，可能会收集、储存和使用下列与您有关的信息：
      </a-typography-paragraph>

      <a-typography-paragraph>
        2.1 账户注册

      </a-typography-paragraph>
      <a-typography-paragraph>
        首先，您需要注册一个账户成为平台用户。
      </a-typography-paragraph>
      <a-typography-paragraph>
        （1）个人用户注册：当您注册时，您需要向我们提供您准备使用的您本人的手机号码，届时我们将通过发送短信验证码的方式来验证您的身份是否有效。若您属于教师用户，那么当您向平台申请学校培训时，系统将自动填写您注册账户时所登记的手机号码。手机号码属于敏感信息，但基于国家法律法规规定的网络实名制要求和账户安全保障需要，若您不提供此项信息，将会导致部分功能无法正常使用。
      </a-typography-paragraph>
      <a-typography-paragraph>
        （2）单位用户注册：单位用户注册需提供个人姓名、登录账号（学号/工号）以便单位进行管理和统计，注册所需信息由单位管理者征集并进行统一录入，完成账户注册。单位用户使用单位提前注册的账户信息登录使用平台，自行提供手机号码进行账户绑定（绑定后单位用户可使用手机号登录与重设密码）。
      </a-typography-paragraph>
      <a-typography-title :level="2">第三条 信息的共享、转让及披露</a-typography-title>

      <a-typography-paragraph>
        3.1 平台收集、使用、储存和使用您的个人信息，是为了实现平台提供的服务，以及实现本隐私政策中描述的某些特定目的。
      </a-typography-paragraph>
      <a-typography-paragraph>
        3.2 平台将不会将您的个人信息出售、出租或分享给任何第三方，但以下情况除外：
      </a-typography-paragraph>
      <a-typography-paragraph>
        （1）事先获得您的specific consent。
      </a-typography-paragraph>
      <a-typography-paragraph>
        （2）根据有关的法律法规要求。
      </a-typography-paragraph>
      <a-typography-title :level="2">第四条 个人信息保护</a-typography-title>

      <a-typography-paragraph>
        4.1您的个人信息将全部被存储于中华人民共和国境内。目前我们暂时不存在跨境存储您的个人信息或向境外提供个人信息的场景。如需跨境存储或向境外提供您的个人信息的，我们会单独向您明确告知（包括出境的目的、接收方、使用方式与范围、使用内容、安全保障措施、安全风险等）并再次征得您的授权同意，并严格要求接收方按照本隐私政策以及其他相关要求来处理您的个人信息。
      </a-typography-paragraph>
      <a-typography-paragraph>
        4.2平台将采取业界先进的安全措施保护您的个人信息安全，包括但不限于加密存储、数据加密、访问控制、备份及恢复、多级审核、
        pseudonymization、one-time passwords、two-factor authentication、IP masking、SSL encryption、HTTPS encryption、IP
        masking、IP anonymization、IP pseudonymization、IP aggregation、IP de
      </a-typography-paragraph>
      <a-typography-paragraph>
        4.3平台不会将您的个人信息用于任何用途，包括但不限于：
      </a-typography-paragraph>
      <a-typography-paragraph>
        （1）用于向您展示、推荐、推送、通知您感兴趣的内容。
      </a-typography-paragraph>
      <a-typography-paragraph>
        （2）阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴。
      </a-typography-paragraph>
      <a-typography-paragraph>
        （3）阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴。
      </a-typography-paragraph>
    </a-typography>
    <div class="privacyPolicy-return">
      <a-button class="privacyPolicy-return-butt" type="primary" @click="goToRouter('/')">返回</a-button>

    </div>
  </div>
</template>

<style scoped>
.privacyPolicy-core {
  padding: 30px;
}

.privacyPolicy-return {
  text-align: center;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.privacyPolicy-return-butt {
  width: 200px;
  height: 50px;
  border-radius: 30px;
  font-size: 15px;
}
</style>