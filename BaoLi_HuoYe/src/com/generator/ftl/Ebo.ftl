package ${basePk};
import ${bk}.model.${className};
import org.yingqu.baoli.ebi.${className}Ebi;
import org.yingqu.framework.ebo.SimpleEbo;
import org.springframework.stereotype.Service;

@Service
public class ${className}Ebo extends SimpleEbo<${className}> implements ${className}Ebi {

protected ${className}Ebo()  {
		super(${className}.class);
	}
}
