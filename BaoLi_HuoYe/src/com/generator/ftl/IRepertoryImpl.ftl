package ${basePk};
import ${bk}.model.${className};
import org.yingqu.baoli.irepertory.${className}Repertory;
import org.yingqu.framework.repertory.SimpleRepertoryHibernateImpl;
import org.springframework.stereotype.Repository;

@Repository
public class ${className}RepertoryImpl extends SimpleRepertoryHibernateImpl<${className}> implements ${className}Repertory {

	protected ${className}RepertoryImpl() {
		super(${className}.class);
	}

}
