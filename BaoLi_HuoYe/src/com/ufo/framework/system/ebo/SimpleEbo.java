package com.ufo.framework.system.ebo;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.ufo.framework.common.core.ext.NodeType;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.log.AppLoggerFactory;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.ebi.SimpleEbi;
import com.ufo.framework.system.irepertory.ISimpleRepertory;

public  abstract class  SimpleEbo<M extends Model> implements SimpleEbi<M>,LogerManager {
	
	private static Logger logger;
	
      protected SimpleEbo(Class<?> clazz)
      {
		logger=AppLoggerFactory.getyingquLogger(clazz); 
      }
	
	@Autowired
	protected ISimpleRepertory<M> repertory;

	public ISimpleRepertory<M> getRepertory() {
		return repertory;
	}

	public void setRepertory(ISimpleRepertory<M> repertory) {
		this.repertory = repertory;
	}

	@Override
	public Object findById(Class<?> clazz, String id) throws Exception  {
		// TODO Auto-generated method stub
		return repertory.findById(clazz, id);
	}

	@Override
	public List<?> findAll(Class<?> clazz) throws Exception {
		// TODO Auto-generated method stub
		return repertory.findAll(clazz);
	}

	@Override
	public Integer getCount(String hql) throws Exception {
		// TODO Auto-generated method stub
		return repertory.getCount(hql);
	}

	@Override
	public List<?> findByPage(Class<?> clazz, String whereSql, int from,
			int size)  throws Exception{
		// TODO Auto-generated method stub
		return repertory.findByPage(clazz, whereSql, from, size);
	}

	@Override
	public Object save(Object entity) throws Exception {
		// TODO Auto-generated method stub
		return repertory.save(entity);
	}

	@Override
	public Object update(Object entity) throws Exception {
		// TODO Auto-generated method stub
		return repertory.update(entity);
	}

	@Override
	public void delete(Object entity) throws Exception {
		// TODO Auto-generated method stub
		repertory.delete(entity);
	}

	@Override
	public void deleteBatchById(Class<?> clazz, String idName, String ids) throws Exception {
		// TODO Auto-generated method stub
		List<?> models=repertory.queryByHql(" from "+clazz.getName()+" where "+idName+" in ("+ids+")");
		for(Object obj:models){
			repertory.delete(obj);
		}
	}
	@Override
	public Object getEntityByHql(String hql) throws Exception {
		// TODO Auto-generated method stub
		return repertory.getEntityByHql(hql);
	}

	@Override
	public Long executeSql(String sql)  throws Exception{
		// TODO Auto-generated method stub
		return repertory.executeSql(sql);
	}

	@Override
	public List<?> queryByHql(String hql) throws Exception {
		// TODO Auto-generated method stub
		return repertory.queryByHql(hql);
	}

	@Override
	public List<?> queryBySql(String sql) throws Exception {
		// TODO Auto-generated method stub
		return repertory.queryBySql(sql);
	}

	@Override
	public List<?> queryBySql(String sql, Class<?> c) throws Exception {
		// TODO Auto-generated method stub
		return repertory.queryBySql(sql, c);
	}

	@Override
	public List<?> queryByHql(String hql, Integer start, Integer limit)  throws Exception{
		// TODO Auto-generated method stub
		return repertory.queryByHql(hql, start, limit);
	}

	@Override
	public Long executeHql(String hql) throws Exception {
		// TODO Auto-generated method stub
		return repertory.executeHql(hql);
	}

	@Override
	public void executeBatchHql(String[] updateSqls) throws Exception {
		// TODO Auto-generated method stub
		for(String sql:updateSqls){
			repertory.executeHql(sql);
		}
	}

	@Override
	public JSONTreeNode buildJSONTreeNode(List<JSONTreeNode> list, String rootId) throws Exception {
		// TODO Auto-generated method stub
		JSONTreeNode root=new JSONTreeNode();
		for(JSONTreeNode node:list){
			if(!(StringUtil.isNotEmpty(node.getParent()) && !node.getId().equals(rootId))){
				root=node;
				list.remove(node);
				break;
			}
		}
		// list 26   root root 
		createTreeChildren(list, root);
		return root;
	}
	private void createTreeChildren(List<JSONTreeNode> childrens,JSONTreeNode root) throws Exception{
		String parentId=root.getId();
		for(int i=0;i<childrens.size();i++){
			JSONTreeNode node=childrens.get(i);
			if(StringUtil.isNotEmpty(node.getParent()) && node.getParent().equals(parentId)){
				root.getChildren().add(node);
				createTreeChildren(childrens, node);
			}
			if(i==childrens.size()-1){
				if(root.getChildren().size()<1){
					root.setLeaf(true);
				}
				return;
			}
		}
	}

	@Override
	public List<JSONTreeNode> getTreeList(String rootId, String tableName,
			String whereSql, JSONTreeNode template,Boolean expanded) throws Exception {
/*	// TODO Auto-generated method stub
		List<JSONTreeNode> chilrens=new ArrayList<JSONTreeNode>();
		StringBuffer sql=new StringBuffer("select ");
		sql.append("t."+template.getId()+",");
		sql.append("t."+template.getText()+",");
		sql.append("t."+template.getCode()+",");
		sql.append("t."+template.getNodeType()+",");
		sql.append("t."+template.getNodeInfo()+",");
		sql.append("t."+template.getNodeInfoType()+",");
		sql.append("t."+template.getParent()+",");
		sql.append("t.orderIndex ");
		if(StringUtil.isNotEmpty(template.getIcon())){
			sql.append(",t."+template.getIcon());
		}
		if(StringUtil.isNotEmpty(template.getHref())){
			sql.append(",t."+template.getHref());
		}
		if(StringUtil.isNotEmpty(template.getBigIcon())){
			sql.append(",t."+template.getBigIcon());
		}
	
		//sql.append(" from "+tableName+" t where 1=1");
		// t1.node_id=t2.parent_id and (t1.node_id= 0 or t1.parent_id= 0 ); 
		sql.append(" from  "+ tableName +" t1, "+tableName+" t  where t1."+template.getId()+"=t."+template.getParent()+" and (t1."+template.getId()+"='"+rootId+"' or t1."+template.getParent()+" ='"+rootId +"')");
	//	sql.append(" order by t."+template.getParent()+",t.orderIndex");
		sql.append(" union select  ");
		sql.append("t2."+template.getId()+",");
		sql.append("t2."+template.getText()+",");
		sql.append("t2."+template.getCode()+",");
		sql.append("t2."+template.getNodeType()+",");
		sql.append("t2."+template.getNodeInfo()+",");
		sql.append("t2."+template.getNodeInfoType()+",");
		sql.append("t2."+template.getParent()+",");
		sql.append("t2.orderIndex ");
		if(StringUtil.isNotEmpty(template.getIcon())){
			sql.append(",t2."+template.getIcon());
		}
		if(StringUtil.isNotEmpty(template.getHref())){
			sql.append(",t2."+template.getHref());
		}
		if(StringUtil.isNotEmpty(template.getBigIcon())){
			sql.append(",t2."+template.getBigIcon());
		}
	     sql.append("  from "+ tableName+ " t2 where t2."+template.getId()+"='"+rootId+"' ");
		System.out.println(sql);
		if(StringUtil.isNotEmpty(whereSql)){
			sql.append(whereSql);
		}*/
		
	// 	sql.append(" start with t."+template.getId()+"='"+rootId+"' CONNECT BY t."+template.getParent()+"= PRIOR t."+template.getId()+" ");

		
	
		List<JSONTreeNode> chilrens=new ArrayList<JSONTreeNode>();
		StringBuffer sql=new StringBuffer("with  cte(");
		sql.append(" "+template.getId()+",");
		sql.append(" "+template.getText()+",");
		sql.append(" "+template.getCode()+",");
		sql.append(" "+template.getNodeType()+",");
		sql.append(" "+template.getNodeInfo()+",");
		sql.append(" "+template.getNodeInfoType()+",");
		sql.append(" "+template.getParent()+",");
		sql.append(" orderIndex ");
		if(StringUtil.isNotEmpty(template.getIcon())){
			sql.append(", "+template.getIcon());
		}
		if(StringUtil.isNotEmpty(template.getHref())){
			sql.append(", "+template.getHref());
		}
		if(StringUtil.isNotEmpty(template.getBigIcon())){
			sql.append(", "+template.getBigIcon());
		}
	
		sql.append(") as ( select ");
		sql.append(" "+template.getId()+",");
		sql.append(" "+template.getText()+",");
		sql.append(" "+template.getCode()+",");
		sql.append(" "+template.getNodeType()+",");
		sql.append(" "+template.getNodeInfo()+",");
		sql.append(" "+template.getNodeInfoType()+",");
		sql.append(" "+template.getParent()+",");
		sql.append(" orderIndex ");
		if(StringUtil.isNotEmpty(template.getIcon())){
			sql.append(", "+template.getIcon());
		}
		if(StringUtil.isNotEmpty(template.getHref())){
			sql.append(", "+template.getHref());
		}
		if(StringUtil.isNotEmpty(template.getBigIcon())){
			sql.append(", "+template.getBigIcon());
		}
	
		sql.append( " from "+tableName +" where "+template.getId()+" ='"+rootId+"' ");
		sql.append(" union all  select ");
		sql.append("t."+template.getId()+",");
		sql.append(" t."+template.getText()+",");
		sql.append(" t."+template.getCode()+",");
		sql.append(" t."+template.getNodeType()+",");
		sql.append(" t."+template.getNodeInfo()+",");
		sql.append(" t."+template.getNodeInfoType()+",");
		sql.append(" t."+template.getParent()+",");
		sql.append(" t.orderIndex ");
		if(StringUtil.isNotEmpty(template.getIcon())){
			sql.append(", t."+template.getIcon());
		}
		if(StringUtil.isNotEmpty(template.getHref())){
			sql.append(", t."+template.getHref());
		}
		if(StringUtil.isNotEmpty(template.getBigIcon())){
			sql.append(", t."+template.getBigIcon());
		}
		sql.append( " from "+tableName +" t inner join  cte as c on t. "+template.getParent()+" =c."+template.getId()+") ");
		sql.append("select ");
		sql.append(" "+template.getId()+",");
		sql.append(" "+template.getText()+",");
		sql.append(" "+template.getCode()+",");
		sql.append(" "+template.getNodeType()+",");
		sql.append(" "+template.getNodeInfo()+",");
		sql.append(" "+template.getNodeInfoType()+",");
		sql.append(" "+template.getParent()+",");
		sql.append(" orderIndex ");
		if(StringUtil.isNotEmpty(template.getIcon())){
			sql.append(", "+template.getIcon());
		}
		if(StringUtil.isNotEmpty(template.getHref())){
			sql.append(", "+template.getHref());
		}
		if(StringUtil.isNotEmpty(template.getBigIcon())){
			sql.append(", "+template.getBigIcon());
		}
		sql.append( " from cte ");
		
		
		
		
		
		
		
		
		
	     System.out.println(sql);
		List<?> alist=repertory.queryBySql(sql.toString());
		for(int i=0;i<alist.size();i++){
			Object[] obj=(Object[]) alist.get(i);
			JSONTreeNode node=new JSONTreeNode();
			node.setId((String)obj[0]);
			node.setText((String)obj[1]);
			node.setCode((String)obj[2]);
			if(NodeType.LEAF.getType().equalsIgnoreCase((String)obj[3])){
				node.setLeaf(true);
			}else{
				node.setLeaf(false);
			}
			node.setNodeInfo((String)obj[4]);
			node.setNodeInfoType((String)obj[5]);
			node.setParent((String)obj[6]);
			if(StringUtil.isNotEmpty((obj[7])+"")){
				node.setOrderIndex(Integer.parseInt(obj[7]+""));
			}
			if(StringUtil.isNotEmpty(template.getIcon())){
				node.setIcon((String)obj[8]);
				if(StringUtil.isNotEmpty(template.getHref())){
					node.setDisabled(Boolean.parseBoolean(obj[9].toString()));
					if(StringUtil.isNotEmpty(template.getBigIcon())){
						node.setBigIcon((String)obj[10]);
					}
				}else if(StringUtil.isNotEmpty(template.getBigIcon())){
					node.setBigIcon((String)obj[9]);
				}
			}else{
				if(StringUtil.isNotEmpty(template.getIcon())){
					node.setDisabled(Boolean.parseBoolean(obj[8].toString()));
					if(StringUtil.isNotEmpty(template.getBigIcon())){
						node.setBigIcon((String)obj[9]);
					}
				}else if(StringUtil.isNotEmpty(template.getBigIcon())){
					node.setBigIcon((String)obj[8]);
				}
			}
			if(expanded!=null){
				node.setExpanded(expanded);
			}
			chilrens.add(node);			
		}
		return chilrens;
	}

	@Override
	public Object formUpdate(Object obj)  throws Exception{

		return repertory.formUpdate(obj);
	}


	
}
