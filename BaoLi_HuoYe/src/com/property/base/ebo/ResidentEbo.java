package com.property.base.ebo;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import org.springframework.stereotype.Service;
import com.model.hibernate.property.FeesInfo;
import com.model.hibernate.property.FeesTypeItem;
import com.model.hibernate.property.ResidentInfo;
import com.property.base.ebi.ResidentEbi;
import com.property.base.vo.FeeSettingInfo;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.web.SecurityUserHolder;

@Service
public class ResidentEbo implements ResidentEbi,LogerManager{

	
	@Resource(name="ebo")
	private Ebi ebi;

	public Ebi getEbi() {
		return ebi;
	}

	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}
	@Override
	public void updateSettingFeesItem(String  dataStr,int[] ids) throws Exception {
		
		JsonConfig config = new JsonConfig();
		config.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
		config.setRootClass(FeeSettingInfo.class);
		FeeSettingInfo[] FeeSettingInfos = (FeeSettingInfo[]) JSONSerializer.toJava(
				JSONArray.fromObject(dataStr), config);
		List<Object> listId=new ArrayList<>();
		for(int id : ids){
         listId.add(id);			
		}
		List<ResidentInfo> residentInfos=(List<ResidentInfo>) ebi.findListIn("ResidentInfo", "tf_residentId", listId);
		residentInfos.forEach(item->{
			for(FeeSettingInfo f : FeeSettingInfos ){
				 try {
					List<FeesTypeItem> list= (List<FeesTypeItem>) ebi.queryByHql(" from FeesTypeItem  where tf_ResidentInfo="+item.getTf_residentId()+" and  tf_FeesInfo= "+f.getItemId());
					if(list.size()>0){
						FeesTypeItem typeItem=list.get(0);
						typeItem.setTf_beginDate(f.getStartdate());
						typeItem.setTf_endDate(f.getEnddate());
						typeItem.setTf_hasEnd(f.getHasEndDate());
						ebi.update(typeItem);
					}else{
						FeesTypeItem fitem=new FeesTypeItem();
						fitem.setTf_beginDate(f.getStartdate());
						fitem.setTf_endDate(f.getEnddate());
						fitem.setTf_hasEnd(f.getHasEndDate());
						fitem.setTf_ResidentInfo(item);
						fitem.setXcode(SecurityUserHolder.getIdentification());
						FeesInfo feesInfo=new FeesInfo();
						feesInfo.setTf_feesid(f.getItemId());
						fitem.setTf_FeesInfo(feesInfo);
						ebi.save(fitem);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			} 
		});

	}
	
	
	
	

}
