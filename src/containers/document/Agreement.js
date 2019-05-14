import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


import styles from '../../styles';
import colors from '../../styles/colors';
import BaseView from '../../components/BaseView/index'
const style = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.defaultText,
    lineHeight: 20,
  },
});

export default function Agreement() {

  return (
    <BaseView title="用户协议">
      <ScrollView style={[styles.container, styles.p30]}>
        <Text style={[style.text, styles.mb20]}>
          尊敬的各位车主，您好，欢迎您使用水稻汽车APP服务。
          当您按照注册、登录页面提示填写信息、阅读并同意本协议且完成全部注册、登录程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与水稻汽车达成协议。您承诺接受并遵守本协议的约定，
          届时您不应以未阅读本协议的内容或者未获得水稻汽车对您问询的解答等理由，主张本协议无效，或要求撤销本协议。
        </Text>

        <Text style={[style.text, styles.mb20]}>一、 协议范围</Text>

        <Text style={style.text}>1、本协议由您与水稻汽车的运营者北京稻成科技有限公司共同缔结，本协议具有合同效力。</Text>
        <Text style={style.text}>2、除另行明确声明外，水稻汽车服务包含任何水稻汽车及其关联公司提供的基于互联网以及移动互联网的相关服务，均受本协议约束。如果您不同意本协议的约定，您应立即停止注册、登录程序或停止使用水稻汽车服务。</Text>
        <Text style={[style.text, styles.mb20]}>3、水稻汽车有权根据需要不时地制订、修改本协议及/或各类规则，并以公示的方式进行变更公告，无需另行单独通知您。变更后的协议和规则一经在公布后，立即或在公告明确的特定时间自动生效。若您在前述变更公告后继续使用水稻汽车服务的，即表示您已经阅读、理解并接受经修订的协议和规则。若您不同意相关变更，应当立即停止使用水稻汽车服务。</Text>

        <Text style={[style.text, styles.mb20]}>二、 注册与账户</Text>
        <Text style={style.text}>1、主体资格</Text>
        <Text style={style.text}>您确认，在您完成注册程序或以其他水稻汽车允许的方式实际使用水稻汽车APP服务时，您应当是具备完全民事行为能权利能力和完全民事力的自然人、法人或其他组织。</Text>

        <Text style={style.text}>2、注册和账户</Text>
        <Text style={style.text}>a）当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，或在您按照注册、登录页面提示填写信息、阅读并同意本协议且完成全部注册、登录程序后，或您以其他水稻汽车允许的方式实际使用水稻汽车APP服务时，您即受本协议约束。您可以使用您提供或确认手机号码或者水稻汽车允许的其它方式作为登录手段进入水稻汽车APP。</Text>
        <Text style={style.text}>b）您了解并同意，如您在水稻汽车APP注册成功，您在此明确授权，您的账户注册信息在您通过水稻汽车APP注册成功时，已授权水稻汽车使用，以使您更便捷地使用水稻汽车服务。</Text>
        <Text style={style.text}>c）在注册或登录时，您应当依照法律法规要求，按相应页面的提示准确提供您的资料，并于资料信息变更时及时更新，以保证您所提交资料的真实、及时、完整和准确。如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，水稻汽车有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部水稻汽车APP服务。水稻汽车对此不承担任何责任，您将承担因此产生的任何直接或间接损失及不利后果。</Text>
        <Text style={[style.text, styles.mb20]}>d）您应当准确填写并及时更新您提供的联系电话、车辆信息等联系方式，以便水稻汽车或加盟门店、合作商家与您进行有效联系，因通过这些联系方式无法与您取得联系，导致您在使用水稻汽车APP服务过程中产生任何损失或增加费用的，应由您完全独自承担。您了解并同意，您有义务保持你提供的联系方式的真实性和有效性，如有变更或需要更新的，您应按水稻汽车的要求进行操作。</Text>

        <Text style={[style.text, styles.mb20]}>3、账户安全</Text>
        <Text style={[style.text, styles.mb20]}>您须自行负责对您的水稻汽车登录手机号码和验证码的保密，且须对您在该登录名、水稻汽车和验证码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）承担责任。</Text>

        <Text style={[style.text, styles.mb20]}>三、 水稻汽车APP服务</Text>
        <Text style={style.text}>1、通过水稻汽车APP提供的服务，水稻汽车、加盟门店或合作商家可在水稻汽车上发布商品及服务信息，您可查询商品和服务信息、达成交易意向、进行交易并支付、对商家进行评价，具体以所开通的APP提供的服务内容为准。</Text>
        <Text style={style.text}>2、您在水稻汽车APP上交易过程中与加盟门店、合作商家发生交易纠纷时，一旦您或商家任一方或双方共同提交水稻汽车要求调处，则水稻汽车作为独立第三方，有权根据单方判断做出调处决定，您了解并同意接受水稻汽车的判断和调处决定。</Text>
        <Text style={style.text}>3、您了解并同意，水稻汽车有权应政府部门（包括司法及行政部门）的要求，向其提供您向水稻汽车提供的用户信息和交易记录等必要信息。如您涉嫌侵犯他人知识产权等合法权益，则水稻汽车亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供您必要的身份信息。</Text>
        <Text style={[style.text, styles.mb20]}>4、您在使用水稻汽车APP服务过程中，所产生的应纳税赋，以及一切硬件、软件、服务及其它方面的费用，均由您独自承担。</Text>

        <Text style={[style.text, styles.mb20]}>四、水稻汽车APP服务使用规范</Text>
        <Text style={style.text}>1、您了解并同意：</Text>
        <Text
          style={style.text}>a）您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，并确保水稻汽车免于因此产生任何损失或增加费用。</Text>
        <Text style={[style.text, styles.mb20]}>b）基于维护水稻汽车APP交易秩序及交易安全的需要，水稻汽车有权在发生恶意购买等扰乱市场正常交易秩序的情形下，执行关闭相应交易订单等操作。</Text>

        <Text style={[style.text, styles.mb20]}>五、协议终止</Text>
        <Text style={style.text}>1、您同意，水稻汽车有权自行全权决定以任何理由不经事先通知的中止、终止向您提供部分或全部水稻汽车APP服务，暂时冻结或永久冻结（注销）您的账户在水稻汽车APP的权限，且无须为此向您或任何第三方承担任何责任。</Text>
        <Text
          style={style.text}>2、出现以下情况时，水稻汽车有权直接以注销账户的方式终止本协议，并有权永久冻结（注销）您的账户在水稻汽车APP的权限和收回账户：</Text>
        <Text style={style.text}>a）水稻汽车终止向您提供服务后，您涉嫌再一次直接或间接以他人名义注册为水稻汽车用户的；</Text>
        <Text style={style.text}>b）您提供的用户信息中的主要内容不真实或不准确或不及时或不完整；</Text>
        <Text style={style.text}>c）本协议（含规则）变更时，您明示并通知水稻汽车不愿接受新的服务协议的；</Text>
        <Text style={style.text}>d）其它水稻汽车认为应当终止服务的情况。</Text>
        <Text style={style.text}>3、您的账户服务被终止或者账户在水稻汽车APP的权限被永久冻结（注销）后，水稻汽车没有义务为您保留或向您披露您账户中的任何信息，也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。</Text>
        <Text style={style.text}>4、您同意，您与水稻汽车的合同关系终止后，水稻汽车仍享有下列权利：</Text>
        <Text style={style.text}>a）继续保存您的用户信息及您使用水稻汽车APP服务期间的所有交易信息。</Text>
        <Text style={[style.text, styles.mb20]}>b）您在使用水稻汽车APP服务期间存在违法行为或违反本协议和/或规则的行为的，水稻汽车仍可依据本协议向您主张权利。</Text>

        <Text style={[style.text, styles.mb20]}>六、法律适用、管辖与其他</Text>
        <Text style={[style.text, { marginBottom: 70 }]}>1、本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国大陆地区法律，如无相关法律规定的，则应参照通用国际商业惯例和/或行业惯例。</Text>
      </ScrollView>
    </BaseView>
  );
}
