package ${basePk};

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import org.HouLynn.framework.annotation.FieldInfo;
import org.HouLynn.framework.model.BaseViewModel;

@Entity
public class ${className}VO implements BaseViewModel {

private String ${pkName};
  <#if pros?exists>
 <#list pros?sort_by("index") as m> 
   @FieldInfo(name=" ${m.getText()}")
   private ${m.getType()} ${m.getDataIndex()};                          
 </#list>
</#if>
  <#if pros?exists>
 <#list pros?sort_by("index") as m> 
      public ${m.getType()} get${m.getDataIndex()?cap_first}(){
		return ${m.getDataIndex()};
	}
	public void set${m.getDataIndex()?cap_first}(${m.getType()} ${m.getDataIndex()}) {
		this.${m.getDataIndex()} = ${m.getDataIndex()};
		}
                </#list>
            </#if>
        public String get${pkName?cap_first}(){
		return ${pkName};
	}
	public void set${pkName?cap_first}(String ${pkName}) {
		this.${pkName} = ${pkName};
		}      
            
	@Transient
	@Override
	public String getDescription() {
		// TODO Auto-generated method stub
		return null;
	}
	private Integer id;
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	@Override
	public Integer getId() {
		// TODO Auto-generated method stub
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
// ViewSQL
/**  
CREATE OR REPLACE VIEW ${className}VO
as select <#if pros?exists>
 <#list pros?sort_by("index") as m> 
    ${m.getDataIndex()},                        
 </#list>
   </#if>
   ${pkName},
   rownum as ID
from ${className}
**/


}
