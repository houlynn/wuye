package ${basePk};
/**
 * 用户修改
* @author HouLynn
* @date 2014年9月2日
  @version 1.0
 */
public class ${className}Po {
  <#if pros?exists>
 <#list pros?sort_by("name") as m> 
 	/**
	 * ${m.getRemark()}
	 */
   private ${m.getType()} ${m.getName()};                          
 </#list>
</#if>
  <#if pros?exists>
 <#list pros?sort_by("name") as m> 
      public ${m.getType()} get${m.getName()?cap_first}(){
		return ${m.getName()};
	}
	public void set${m.getName()?cap_first}(${m.getType()} ${m.getName()}) {
		this.${m.getName()} = ${m.getName()};
		}
                </#list>
            </#if>
            
}
