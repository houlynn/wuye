package com.ufo.framework.system.ebo;


import java.io.File;
import java.util.List;

import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.SysIcon;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.core.utils.FileUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.controller.SimpleBaseController;
import com.ufo.framework.system.ebi.SysIconEbi;

/**
 * 
* @author 作者 yingqu: 
* @version 创建时间：2014年6月24日 下午4:04:36 
* version 1.0
 */
@Service
public class SysIconEbo extends SimpleEbo<SysIcon> implements SysIconEbi {
	protected SysIconEbo() {
		super(SysIcon.class);
	}
	@Override
	public void syncIconCss() throws Exception{
		// TODO Auto-generated method stub
		String filePath=PropUtil.get("sys.icon.filepath");
		File iconFile=FileUtil.createFile(SimpleBaseController.webrootAbsPath+filePath);
		StringBuffer cssStr=buildIconStr();
		FileUtil.writeFileStr(cssStr.toString(), iconFile);
	}
	/**
	 * 构建图标的样式文本
	 * @param icon
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private StringBuffer buildIconStr() throws Exception{
		StringBuffer cssStr=new StringBuffer("");
		List<SysIcon> icons=(List<SysIcon>) repertory.queryByHql(" from SysIcon");
		for(SysIcon icon:icons){
			String iconCls=icon.getIconCls();
			String iconPath=icon.getIcon();
			String pixel=icon.getPixel();
			Integer width=16;
			Integer height=16;
			if(StringUtil.isNotEmpty(pixel)){
				String[] pixelArray=pixel.split("\\*");
				if(pixelArray.length>1){
					width=Integer.parseInt(pixelArray[0]);
					height=Integer.parseInt(pixelArray[1]);
				}
			}
			String iconStr="."+iconCls+"{width:"+width+";height:"+height+";background-image: url("+iconPath+")!important;}\n";
			cssStr.append(iconStr);
		}
		return cssStr;
		
	}
	

}
