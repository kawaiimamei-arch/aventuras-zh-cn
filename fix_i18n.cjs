/**
 * Fix: Add ALL 227 missing translation keys to zh-CN.ts
 * Run this from Aventuras-master/ directory
 */
const fs = require('fs');
const path = require('path');

// Walk directory to find Svelte files
function walk(dir, files) {
  try { fs.readdirSync(dir).forEach(f => { const p = path.join(dir, f); try { if (fs.statSync(p).isDirectory()) walk(p, files); else if (f.endsWith('.svelte')) files.push(p); } catch(e) {} }); } catch(e) {}
}
let files = [];
walk('src/lib/components', files);
console.log('Found', files.length, 'Svelte files');

const zhcn = fs.readFileSync('src/lib/i18n/zh-CN.ts', 'utf8');
const definedKeys = new Set();
for (const line of zhcn.split('\n')) {
  const m = line.trim().match(/^'([^']+)':/);
  if (m) definedKeys.add(m[1]);
}
console.log('Defined keys:', definedKeys.size);

let broken = new Map();
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const scriptEnd = content.indexOf('</script>');
  const template = scriptEnd >= 0 ? content.substring(scriptEnd + 9) : content;
  const matches = template.match(/\{t\('[^']+'\)\}/g) || [];
  for (const m of matches) {
    const keyMatch = m.match(/'([^']+)'/);
    if (!keyMatch) continue;
    const key = keyMatch[1];
    if (!definedKeys.has(key) && key.length > 1 && /^[a-z_.-]+$/.test(key)) {
      broken.set(key, (broken.get(key) || 0) + 1);
    }
  }
}
console.log('Broken keys:', broken.size);

// Map ALL broken keys to Chinese
const T = {};
const tr = (k, v) => { T[k] = v; };
tr('common.delete', '删除'); tr('common.name', '名称'); tr('common.description', '描述');
tr('common.type', '类型'); tr('common.title', '标题'); tr('common.cancel', '取消');
tr('common.save', '保存'); tr('common.add', '添加'); tr('common.close', '关闭');
tr('common.dismiss', '忽略'); tr('common.reset_to_default', '恢复默认');
tr('common.reset_to_defaults', '恢复默认设置'); tr('common.toggle', '切换');
tr('common.loading', '加载中…'); tr('common.saving', '保存中…');

tr('app.generating', '生成中…'); tr('app.analyzing', '分析中…');

tr('sidebar.story', '故事'); tr('sidebar.lorebook', '知识库'); tr('sidebar.memory', '记忆');
tr('sidebar.characters', '角色');

tr('settings.title', '设置'); tr('settings.subtitle', '配置你的 Aventuras 体验');
tr('settings.save', '保存'); tr('settings.cancel', '取消'); tr('settings.reset', '重置');
tr('settings.reset_all', '重置所有设置'); tr('settings.reset_all_desc', '将所有设置重置为默认值。API 密钥将被保留。');
tr('settings.resetting', '重置中…'); tr('settings.manual_body_desc', '编辑手动请求体。这会覆盖请求参数。');
tr('settings.tab.api', 'API'); tr('settings.api.setup', 'API 设置');
tr('settings.api.add_profile', '添加配置文件');
tr('settings.interface.theme', '主题'); tr('settings.interface.font_size', '字体大小');
tr('settings.interface.story_width', '故事宽度'); tr('settings.interface.show_word_count', '显示字数');
tr('settings.interface.spellcheck', '拼写检查'); tr('settings.interface.auto_scroll', '自动滚动');
tr('settings.translation.enable', '启用翻译');
tr('settings.translation.description', '将 AI 响应翻译为你的语言');
tr('settings.translation.target_language', '目标语言');
tr('settings.translation.translate_narration', '翻译叙事');
tr('settings.translation.translate_input', '翻译用户输入');
tr('settings.translation.translate_world_state', '翻译世界状态');

tr('character.add', '添加角色'); tr('item.add', '添加物品');
tr('item.name_placeholder', '物品名称');
tr('location.add', '添加地点'); tr('location.name_placeholder', '地点名称');
tr('location.description_placeholder', '描述（可选）'); tr('location.edit_current', '编辑当前位置');
tr('quest.add', '添加任务');

tr('memory.no_chapters', '暂无篇章');

tr('vault.title', '库管理'); tr('vault.import', '导入'); tr('vault.tags', '标签');
tr('vault.search', '搜索…'); tr('vault.favorites', '收藏');

tr('lorebook.entry_name_placeholder', '条目名称'); tr('lorebook.description_placeholder', '描述');
tr('lorebook.alternative_names_hint', '触发此条目的替代名称');
tr('lorebook.add_alias_placeholder', '添加别名'); tr('lorebook.keywords_hint', '出现时触发的关键词');
tr('lorebook.add_keyword_placeholder', '添加关键词'); tr('lorebook.context_inclusion', '上下文包含');
tr('lorebook.keyword_mode_description', '当关键词出现时注入此条目');
tr('lorebook.priority_hint', '数值越大越优先注入'); tr('lorebook.hide_from_ai', '对 AI 隐藏');
tr('lorebook.hide_from_ai_description', '防止 AI 知识库管理工具编辑此条目');
tr('lorebook.secrets_hint', '角色尚不知道的信息'); tr('lorebook.hidden_info_placeholder', '尚未揭露的秘密…');
tr('lorebook.what_to_export', '导出内容'); tr('lorebook.all_entries', '所有条目');
tr('lorebook.entries', '条目'); tr('lorebook.selected_only', '仅选中');
tr('lorebook.all_entries_exported', '所有条目已导出'); tr('lorebook.export_format', '导出格式');
tr('lorebook.exporting', '导出中…'); tr('lorebook.import_description', '从文件导入知识库条目');
tr('lorebook.drop_file_here', '拖放文件到此处'); tr('lorebook.click_to_browse', '点击浏览');
tr('lorebook.supported_formats', '支持 JSON 和 YAML');
tr('lorebook.ai_classification', 'AI 分类'); tr('lorebook.ai_classification_description', '使用 AI 自动检测条目类型');
tr('lorebook.choose_different_file', '选择其他文件'); tr('lorebook.found_entries', '找到条目');
tr('lorebook.import_entries', '导入条目'); tr('lorebook.importing', '导入中…');
tr('lorebook.classifying', '分类中…'); tr('lorebook.edit_entry', '编辑条目');
tr('lorebook.hidden_info', '隐藏信息'); tr('lorebook.search', '搜索'); tr('lorebook.add_entry', '添加条目');
tr('lorebook.export', '导出'); tr('lorebook.import', '导入');
tr('lorebook.keywords', '关键词'); tr('lorebook.aliases', '别名');
tr('lorebook.priority', '优先级');

tr('advanced.manual_request_mode', '手动请求模式'); tr('advanced.manual_request_mode_description', '手动编辑请求体，覆盖预设参数');
tr('advanced.manual_mode_active', '手动模式已启用'); tr('advanced.debug_mode', '调试模式');
tr('advanced.debug_mode_description', '显示调试信息和日志'); tr('advanced.logs_session_only', '仅当前会话日志');
tr('advanced.lorebook_import', '知识库导入'); tr('advanced.lorebook_import_description', '知识库导入的设置');
tr('advanced.batch_size', '批量大小'); tr('advanced.reliable', '可靠'); tr('advanced.fast', '快速');
tr('advanced.max_concurrent_requests', '最大并发请求数'); tr('advanced.sequential', '顺序');
tr('advanced.parallel', '并行'); tr('advanced.lore_management', '知识库管理');
tr('advanced.lore_management_description', '自主知识库管理的设置'); tr('advanced.max_iterations', '最大迭代次数');
tr('advanced.conservative', '保守'); tr('advanced.extensive', '广泛');
tr('advanced.world_state_classifier', '世界状态分类器'); tr('advanced.world_state_classifier_description', '从叙事中提取角色、地点、物品等实体');
tr('advanced.chat_history_truncation', '聊天历史截断'); tr('advanced.unlimited', '无限制');
tr('advanced.words_500', '500 词'); tr('advanced.words_1000', '1000 词');
tr('advanced.entry_retrieval', '条目检索'); tr('advanced.entry_retrieval_description', '知识库条目检索的设置');
tr('advanced.enable_llm_selection', '启用 LLM 选择'); tr('advanced.enable_llm_selection_description', '使用 LLM 选择最相关的知识库条目');
tr('advanced.max_tier3_entries', 'Tier 3 最大条目'); tr('advanced.entries_20', '20 条目');
tr('advanced.max_words_per_entry', '每条目最大词数'); tr('advanced.entries_lower', '条目');
tr('advanced.memory_retrieval', '记忆检索'); tr('advanced.memory_retrieval_description', '从过去的篇章中检索上下文');
tr('advanced.enable_memory_retrieval', '启用记忆检索'); tr('advanced.enable_memory_retrieval_description', '自动检索相关的过去篇章');
tr('advanced.retrieval_mode', '检索模式'); tr('advanced.static', '静态');
tr('advanced.static_description', '基于关键词的静态检索'); tr('advanced.agentic', '自主代理');
tr('advanced.agentic_description', '使用自主代理进行检索'); tr('advanced.max_queries', '最大查询数');
tr('advanced.max_queries_description', '每次检索的最大查询数量'); tr('advanced.max_iterations_retrieval_description', '自主检索的最大迭代次数');
tr('advanced.context_window', '上下文窗口'); tr('advanced.context_window_description', '上下文窗口设置');
tr('advanced.retrieval_classification', '检索分类'); tr('advanced.retrieval_classification_description', '检索和分类的配置');
tr('advanced.tiered_context_building', '分层上下文构建'); tr('advanced.tiered_context_description', '分层构建上下文的设置');
tr('advanced.action_choices', '行动选项'); tr('advanced.action_choices_description', '行动选项生成的设置');
tr('advanced.lorebook_limits', '知识库限制'); tr('advanced.lorebook_limits_description', '知识库条目注入限制');
tr('advanced.suggestions', '建议'); tr('advanced.suggestions_description', '故事情节建议的设置');
tr('advanced.action_choices_limits_description', '行动选项的注入限制'); tr('advanced.per_tier', '每层');
tr('advanced.per_tier_description', '每个 Tier 的最大条目数'); tr('advanced.llm_selection_threshold', 'LLM 选择阈值');
tr('advanced.llm_threshold_description', '超过此阈值时使用 LLM 进行选择');

tr('tts.enable', '启用 TTS'); tr('tts.enable_description', '启用文字转语音旁白');
tr('tts.provider', '提供商'); tr('tts.api_endpoint', 'API 端点'); tr('tts.api_key', 'API 密钥');
tr('tts.api_key_placeholder', '输入 API 密钥'); tr('tts.model', '模型'); tr('tts.voice', '语音');
tr('tts.system_voice', '系统语音'); tr('tts.loading_voices', '加载语音列表…');
tr('tts.no_voices_found', '未找到语音'); tr('tts.language', '语言'); tr('tts.stop', '停止');
tr('tts.preview_voice', '预览语音'); tr('tts.volume_override', '音量覆盖');
tr('tts.volume_override_description', '覆盖默认音量'); tr('tts.narration_volume', '旁白音量');
tr('tts.speech_speed', '语速'); tr('tts.speech_speed_description', '文字转语音的朗读速度');
tr('tts.auto_play', '自动播放'); tr('tts.auto_play_description', '生成旁白时自动播放');
tr('tts.excluded_characters', '排除字符'); tr('tts.excluded_characters_description', '朗读前从文本中排除的字符');
tr('tts.excluded_characters_placeholder', '*, #, _'); tr('tts.remove_html_tags', '移除 HTML 标签');
tr('tts.remove_html_tags_description', '朗读前移除 HTML 标签'); tr('tts.html_tags_to_remove', '要移除的 HTML 标签');
tr('tts.html_tags_to_remove_placeholder', 'span, div'); tr('tts.html_tags_to_remove_description', '移除指定标签内容');
tr('tts.remove_all_tag_content', '移除标签内容'); tr('tts.remove_all_tag_content_description', '移除 HTML 标签及其内容');

tr('images.profiles', '配置文件'); tr('images.story_images', '故事图片'); tr('images.characters', '角色');
tr('images.backgrounds', '背景'); tr('images.testing', '测试'); tr('images.profiles_description', '图片生成配置文件');
tr('images.add_profile', '添加配置文件'); tr('images.upload_confirm_workflow', '确认工作流');
tr('images.create_profile', '创建配置文件'); tr('images.no_profiles', '无配置文件');
tr('images.no_profiles_description', '暂无图片生成配置文件'); tr('images.story_image_profile_selection', '故事图片配置');
tr('images.reference_profile', '参考图配置'); tr('images.reference_profile_description', 'img2img 参考图配置');
tr('images.regular_image_profile', '普通图片配置'); tr('images.regular_image_profile_description', '故事配图配置');
tr('images.models_configured_in_profiles', '模型在配置文件中设置'); tr('images.select_profile_placeholder', '选择配置文件');
tr('images.regular_image_size', '普通图片尺寸'); tr('images.select_size', '选择尺寸');
tr('images.reference_img2img_profile', '参考 img2img 配置'); tr('images.reference_image_size', '参考图尺寸');
tr('images.story_image_style', '故事图片风格'); tr('images.select_style', '选择风格');
tr('images.story_image_style_description', '选择故事图片的风格'); tr('images.max_images_per_message', '最大图片数');
tr('images.character_portrait_profile', '角色头像配置'); tr('images.character_portrait_profile_description', '角色头像生成配置');
tr('images.character_portrait_size', '角色头像尺寸'); tr('images.character_portrait_style', '角色头像风格');
tr('images.character_portrait_style_description', '选择角色头像的风格'); tr('images.background_profile', '背景图配置');
tr('images.background_profile_description', '背景图片生成配置'); tr('images.background_size', '背景尺寸');
tr('images.background_blur', '背景模糊'); tr('images.background_blur_description', '背景模糊程度');
tr('images.test_profile', '测试配置'); tr('images.select_profile_to_test', '选择测试配置');
tr('images.prompt', '提示词'); tr('images.enter_test_prompt', '输入测试提示词');
tr('images.size', '尺寸'); tr('images.generating', '生成中…'); tr('images.generate_test_image', '生成测试图');
tr('images.generation_error', '生成错误'); tr('images.result_image', '结果图片');
tr('images.generated_test_alt', '生成的测试图'); tr('images.name', '名称');
tr('images.name_placeholder', '配置名称'); tr('images.provider', '提供商');
tr('images.select_provider', '选择提供商'); tr('images.api_key', 'API 密钥');
tr('images.enter_api_key', '输入 API 密钥'); tr('images.copy_from_api_profile', '从 API 配置复制');
tr('images.base_url_optional', '基础 URL（可选）'); tr('images.custom_base_url', '自定义基础 URL');
tr('images.model', '模型'); tr('images.model_description', '选择图片生成模型');
tr('images.img2img_warning', '需要参考图配置'); tr('images.steps', '步数');
tr('images.sampler', '采样器'); tr('images.scheduler', '调度器');
tr('images.cfg_scale', 'CFG 缩放'); tr('images.negative_prompt', '负面提示词');
tr('images.negative_prompt_placeholder', '负面提示词（可选）'); tr('images.mode', '模式');
tr('images.select_mode', '选择模式'); tr('images.select_sampler', '选择采样器');
tr('images.select_scheduler', '选择调度器'); tr('images.cfg', 'CFG');
tr('images.enter_cfg', '输入 CFG'); tr('images.enter_steps', '输入步数');
tr('images.positive_prompt_base', '基础正面提示词'); tr('images.positive_prompt_placeholder', '正面提示词');
tr('images.custom_workflow', '自定义工作流'); tr('images.nodes', '节点');
tr('images.prompt_arrow', '提示词'); tr('images.seed_arrow', '种子');
tr('images.negative_arrow', '负面'); tr('images.no_negative_detected', '未检测到负面提示词');
tr('images.multiple_prompt_nodes', '多个提示词节点'); tr('images.confirm_selection', '确认选择');
tr('images.how_to_get_workflow', '如何获取工作流'); tr('images.upload_workflow_json', '上传工作流 JSON');
tr('images.lora_model', 'LoRA 模型'); tr('images.select_lora', '选择 LoRA');
tr('images.lora_description', 'LoRA 模型描述'); tr('images.model_strength', '模型强度');
tr('images.model_strength_placeholder', '模型强度'); tr('images.clip_strength', 'CLIP 强度');
tr('images.clip_strength_placeholder', 'CLIP 强度'); tr('images.clip_text_encoder', 'CLIP 文本编码器');
tr('images.auto_detect_clip', '自动检测 CLIP'); tr('images.clip_auto_detect_description', '自动检测 CLIP 设置');
tr('images.vae', 'VAE'); tr('images.vae_auto_detect_description', '自动检测 VAE 设置');
tr('images.clip_type', 'CLIP 类型'); tr('images.select_clip_type', '选择 CLIP 类型');
tr('images.weight_dtype', '权重数据类型'); tr('images.select_dtype', '选择数据类型');
tr('images.no_api_key', '无 API 密钥'); tr('images.key_configured', '已配置密钥');
tr('images.loading', '加载中…'); tr('images.refresh', '刷新'); tr('images.unlimited', '无限制');

tr('suggestions.what_happens_next', '接下来会发生什么？'); tr('suggestions.suggestions', '建议');
tr('suggestions.generate_new', '生成新建议'); tr('suggestions.generating', '生成中…');
tr('suggestions.no_suggestions', '暂无建议');

// Count untranslated
let count = 0, untranslated = 0;
for (const [key] of broken) {
  if (T[key]) count++;
  else untranslated++;
}
console.log('Translated:', count, 'Untranslated:', untranslated);

// Build new lines
let newLines = [];
for (const key of [...broken.keys()].sort()) {
  const val = T[key] || key;
  newLines.push("  '" + key + "': '" + val + "',");
}

// Insert before last }
let content = zhcn.split('\n');
let lastBrace = -1;
for (let i = content.length - 1; i >= 0; i--) {
  if (content[i].trim() === '}') { lastBrace = i; break; }
}
content.splice(lastBrace, 0, ...newLines);
fs.writeFileSync('src/lib/i18n/zh-CN.ts', content.join('\n'));
console.log('Done. Added', newLines.length, 'lines. Total:', content.length, 'lines');
