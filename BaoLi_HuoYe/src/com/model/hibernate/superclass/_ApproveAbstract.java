package com.model.hibernate.superclass;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.model.hibernate.systemset._ModuleApprove;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.core.web.CommonFunction;


//此标注语言表明这是一个非实体类，但是其属性都可以映射到子类中
@MappedSuperclass
// 具有审批权限的类继承此类
public abstract class _ApproveAbstract extends _InputInfoAbstract {

	public static final String APPROVE_OK = "已通过";
	public static final String APPROVE_CANCEL = "已终止";
	public static final String APPROVE_EXEC = "审批中";

	@Transient
	protected Boolean tf_closeApprove; // 如果传入的参数为真，那么将直接置审批结果为
																			// 已通过，只在需要加的那一个人那的级数里出现

	@FieldInfo(title = "已审批级数", number = 1000)
	@Column(insertable = false, updatable = false)
	private Integer tf_shNowCount;

	@FieldInfo(title = "审批结果", number = 1001)
	@Column(length = 10)
	protected String tf_shResult; // 最终审批结果 "已通过" "已终止" ,"审批中" ,

	@FieldInfo(title = "审批日期", number = 1002)
	protected Date tf_shResultDate;// 最终审批的日期

	@FieldInfo(title = "审批人员", number = 1003)
	protected String tf_shResultName;// 最终审批人员

	@FieldInfo(title = "审批意见", number = 1004)
	protected String tf_shResultExplain;// 审批意见

	@FieldInfo(title = "锁定", number = 1009)
	protected Boolean tf_shLocked; // 如果为真 ，那么不允许再修改或者 再 审批了

	@FieldInfo(title = "审批人员1", number = 1110)
	@Column(length = 10)
	protected String tf_shname1;// 审批人员
	@FieldInfo(title = "审批日期1", number = 1120)
	protected Date tf_shdate1;// 审批日期
	@FieldInfo(title = "审批结果1", number = 1130)
	@Column(length = 20)
	protected String tf_shresult1;// 审批结果
	@FieldInfo(title = "审批意见1", number = 1140)
	protected String tf_shexplain1;// 审批意见

	@FieldInfo(title = "审批人员2", number = 1210)
	@Column(length = 10)
	protected String tf_shname2;// 审批人员
	@FieldInfo(title = "审批日期2", number = 1220)
	protected Date tf_shdate2;// 审批日期
	@FieldInfo(title = "审批结果2", number = 1230)
	@Column(length = 20)
	protected String tf_shresult2;// 审批结果
	@FieldInfo(title = "审批意见2", number = 1240)
	protected String tf_shexplain2;// 审批意见

	@FieldInfo(title = "审批人员3", number = 1310)
	@Column(length = 10)
	protected String tf_shname3;// 审批人员
	@FieldInfo(title = "审批日期3", number = 1320)
	protected Date tf_shdate3;// 审批日期
	@FieldInfo(title = "审批结果3", number = 1330)
	@Column(length = 20)
	protected String tf_shresult3;// 审批结果
	@FieldInfo(title = "审批意见3", number = 1340)
	protected String tf_shexplain3;// 审批意见

	@FieldInfo(title = "审批人员4", number = 1410)
	@Column(length = 10)
	protected String tf_shname4;// 审批人员
	@FieldInfo(title = "审批日期4", number = 1420)
	protected Date tf_shdate4;// 审批日期
	@FieldInfo(title = "审批结果4", number = 1430)
	@Column(length = 20)
	protected String tf_shresult4;// 审批结果
	@FieldInfo(title = "审批意见4", number = 1440)
	protected String tf_shexplain4;// 审批意见

	@FieldInfo(title = "审批人员5", number = 1510)
	@Column(length = 10)
	protected String tf_shname5;// 审批人员
	@FieldInfo(title = "审批日期5", number = 1520)
	protected Date tf_shdate5;// 审批日期
	@FieldInfo(title = "审批结果5", number = 1530)
	@Column(length = 20)
	protected String tf_shresult5;// 审批结果
	@FieldInfo(title = "审批意见5", number = 1540)
	protected String tf_shexplain5;// 审批意见

	@FieldInfo(title = "审批人员6", number = 1610)
	@Column(length = 10)
	protected String tf_shname6;// 审批人员
	@FieldInfo(title = "审批日期6", number = 1620)
	protected Date tf_shdate6;// 审批日期
	@FieldInfo(title = "审批结果6", number = 1630)
	@Column(length = 20)
	protected String tf_shresult6;// 审批结果
	@FieldInfo(title = "审批意见6", number = 1640)
	protected String tf_shexplain6;// 审批意见

	public void clearResultInfo() {
		setTf_shResult(APPROVE_EXEC);
		setTf_shResultDate(null);
		setTf_shResultName(null);
		setTf_shResultExplain(null);
	}

	//在保存了审批之后，到这里来重新计算最后的审批结果，是否要修改
	public void adjustResultInfo(int order, int allLevel) {
		try {
			String approveResult = (String) CommonFunction.getProperty(this, "tf_shresult" + order);
			// 不同意
			if (approveResult.startsWith("不")) {
				setTf_shResult(_ApproveAbstract.APPROVE_CANCEL);
				setTf_shResultDate((Date) CommonFunction.getProperty(this, "tf_shdate" + order));
				setTf_shResultName((String) CommonFunction.getProperty(this, "tf_shname" + order));
				setTf_shResultExplain(null);
			} else if (order == allLevel) {
				setTf_shResult(_ApproveAbstract.APPROVE_OK);
				setTf_shResultDate((Date) CommonFunction.getProperty(this, "tf_shdate" + order));
				setTf_shResultName((String) CommonFunction.getProperty(this, "tf_shname" + order));
				setTf_shResultExplain(null);
			}
		} catch (Exception e) {
		}
	}

	// 判断是否我可以审批此条记录
	public Boolean meCanApprove(int order, int level, List<_ModuleApprove> moduleApproves)
			throws NoSuchFieldException, IllegalAccessException {
		if (getTf_shResultDate() == null
				&& CommonFunction.getProperty(this, "tf_shdate" + order) == null) {
			for (_ModuleApprove approve : moduleApproves) {
				if (approve.getTf_level() < level) {
					if (CommonFunction.getProperty(this, "tf_shdate" + approve.getTf_level()) == null)
						return false;
				}
			}
			return true;
		} else
			return false;
	}

	// 根据审核情况自动更正result中的信息

	public void afterShSetResultMessage() {
		// 对于一个正在审批中的，他的状态只能变成 完成，或不批准

		if (getTf_shResult().equals(APPROVE_EXEC)) {
			if (tf_shdate1 != null) { // 第一级审批了
				if (tf_shresult1.startsWith("不")) {
					tf_shResult = APPROVE_CANCEL;
					tf_shResultName = tf_shname1;
					tf_shResultDate = tf_shdate1;
				} else {
					tf_shResult = APPROVE_OK;
					tf_shResultName = tf_shname1;
					tf_shResultDate = tf_shdate1;
				}
			}
		}
	}

	// 共审批了多少级了
	@Transient
	public Integer getTf_alreadyApprovedCount() {
		Integer result = (tf_shdate1 == null ? 0 : 1) + (tf_shdate2 == null ? 0 : 1)
				+ (tf_shdate3 == null ? 0 : 1) + (tf_shdate4 == null ? 0 : 1)
				+ (tf_shdate5 == null ? 0 : 1) + (tf_shdate6 == null ? 0 : 1);
		return result;
	}

	// 当前该第n级审批了
	@Transient
	public Integer getTf_nextApprovedNumber() {
		if (tf_shdate6 == null)
			return 6;
		if (tf_shdate5 == null)
			return 6;
		if (tf_shdate4 == null)
			return 6;
		if (tf_shdate3 == null)
			return 6;
		if (tf_shdate2 == null)
			return 6;
		if (tf_shdate1 == null)
			return 6;
		return 0;
	}

	// 共审批了多少级了，如果全部审批的，返回true,一级都没审批，返回null ,审批了几级，则显示数字
	@Transient
	public String getTf_approvedCount() {
		if (getTf_shResult().equals(APPROVE_OK))
			return "true";
		else if (getTf_shResult().equals(APPROVE_CANCEL))
			return "false";
		{
			Integer result = (tf_shdate1 == null ? 0 : 1) + (tf_shdate2 == null ? 0 : 1)
					+ (tf_shdate3 == null ? 0 : 1) + (tf_shdate4 == null ? 0 : 1)
					+ (tf_shdate5 == null ? 0 : 1) + (tf_shdate6 == null ? 0 : 1);
			if (result == 0)
				return null;
			else
				return result.toString();
		}
	}

	// @Transient
	// public Boolean getTf_approved() { // 是否审批完成了
	// return tf_shdate1 != null;
	// }

	public String getTf_shname1() {
		return tf_shname1;
	}

	public void setTf_shname1(String tf_shname1) {
		this.tf_shname1 = tf_shname1;
	}

	public Date getTf_shdate1() {
		return tf_shdate1;
	}

	public void setTf_shdate1(Date tf_shdate1) {
		this.tf_shdate1 = tf_shdate1;
	}

	public String getTf_shresult1() {
		return tf_shresult1;
	}

	public void setTf_shresult1(String tf_shresult1) {
		this.tf_shresult1 = tf_shresult1;
	}

	public String getTf_shexplain1() {
		return tf_shexplain1;
	}

	public void setTf_shexplain1(String tf_shexplain1) {
		this.tf_shexplain1 = tf_shexplain1;
	}

	public String getTf_shname2() {
		return tf_shname2;
	}

	public void setTf_shname2(String tf_shname2) {
		this.tf_shname2 = tf_shname2;
	}

	public Date getTf_shdate2() {
		return tf_shdate2;
	}

	public void setTf_shdate2(Date tf_shdate2) {
		this.tf_shdate2 = tf_shdate2;
	}

	public String getTf_shresult2() {
		return tf_shresult2;
	}

	public void setTf_shresult2(String tf_shresult2) {
		this.tf_shresult2 = tf_shresult2;
	}

	public String getTf_shexplain2() {
		return tf_shexplain2;
	}

	public void setTf_shexplain2(String tf_shexplain2) {
		this.tf_shexplain2 = tf_shexplain2;
	}

	public String getTf_shname3() {
		return tf_shname3;
	}

	public void setTf_shname3(String tf_shname3) {
		this.tf_shname3 = tf_shname3;
	}

	public Date getTf_shdate3() {
		return tf_shdate3;
	}

	public void setTf_shdate3(Date tf_shdate3) {
		this.tf_shdate3 = tf_shdate3;
	}

	public String getTf_shresult3() {
		return tf_shresult3;
	}

	public void setTf_shresult3(String tf_shresult3) {
		this.tf_shresult3 = tf_shresult3;
	}

	public String getTf_shexplain3() {
		return tf_shexplain3;
	}

	public void setTf_shexplain3(String tf_shexplain3) {
		this.tf_shexplain3 = tf_shexplain3;
	}

	public String getTf_shname4() {
		return tf_shname4;
	}

	public void setTf_shname4(String tf_shname4) {
		this.tf_shname4 = tf_shname4;
	}

	public Date getTf_shdate4() {
		return tf_shdate4;
	}

	public void setTf_shdate4(Date tf_shdate4) {
		this.tf_shdate4 = tf_shdate4;
	}

	public String getTf_shresult4() {
		return tf_shresult4;
	}

	public void setTf_shresult4(String tf_shresult4) {
		this.tf_shresult4 = tf_shresult4;
	}

	public String getTf_shexplain4() {
		return tf_shexplain4;
	}

	public void setTf_shexplain4(String tf_shexplain4) {
		this.tf_shexplain4 = tf_shexplain4;
	}

	public String getTf_shname5() {
		return tf_shname5;
	}

	public void setTf_shname5(String tf_shname5) {
		this.tf_shname5 = tf_shname5;
	}

	public Date getTf_shdate5() {
		return tf_shdate5;
	}

	public void setTf_shdate5(Date tf_shdate5) {
		this.tf_shdate5 = tf_shdate5;
	}

	public String getTf_shresult5() {
		return tf_shresult5;
	}

	public void setTf_shresult5(String tf_shresult5) {
		this.tf_shresult5 = tf_shresult5;
	}

	public String getTf_shexplain5() {
		return tf_shexplain5;
	}

	public void setTf_shexplain5(String tf_shexplain5) {
		this.tf_shexplain5 = tf_shexplain5;
	}

	public String getTf_shname6() {
		return tf_shname6;
	}

	public void setTf_shname6(String tf_shname6) {
		this.tf_shname6 = tf_shname6;
	}

	public Date getTf_shdate6() {
		return tf_shdate6;
	}

	public void setTf_shdate6(Date tf_shdate6) {
		this.tf_shdate6 = tf_shdate6;
	}

	public String getTf_shresult6() {
		return tf_shresult6;
	}

	public void setTf_shresult6(String tf_shresult6) {
		this.tf_shresult6 = tf_shresult6;
	}

	public String getTf_shexplain6() {
		return tf_shexplain6;
	}

	public void setTf_shexplain6(String tf_shexplain6) {
		this.tf_shexplain6 = tf_shexplain6;
	}

	public String getTf_shResult() {
		return tf_shResult == null ? APPROVE_EXEC : tf_shResult;
	}

	public void setTf_shResult(String tf_shResult) {
		this.tf_shResult = tf_shResult == null ? APPROVE_EXEC : tf_shResult;
	}

	public Date getTf_shResultDate() {
		return tf_shResultDate;
	}

	public void setTf_shResultDate(Date tf_shResultDate) {
		this.tf_shResultDate = tf_shResultDate;
	}

	public String getTf_shResultName() {
		return tf_shResultName;
	}

	public void setTf_shResultName(String tf_shResultName) {
		this.tf_shResultName = tf_shResultName;
	}

	public Boolean getTf_shLocked() {
		return tf_shLocked == null ? false : tf_shLocked;
	}

	public void setTf_shLocked(Boolean tf_shLocked) {
		this.tf_shLocked = tf_shLocked == null ? false : tf_shLocked;
	}

	public Boolean getTf_closeApprove() {
		return tf_closeApprove;
	}

	public void setTf_closeApprove(Boolean tf_closeApprove) {
		this.tf_closeApprove = tf_closeApprove;
	}

	public String getTf_shResultExplain() {
		return tf_shResultExplain;
	}

	public void setTf_shResultExplain(String tf_shResultExplain) {
		this.tf_shResultExplain = tf_shResultExplain;
	}

	public Integer getTf_shNowCount() {
		return tf_shNowCount;
	}

	public void setTf_shNowCount(Integer tf_shNowCount) {
		this.tf_shNowCount = tf_shNowCount;
	}

}
