/**
 * Simplified Chinese (zh-CN) translations for Aventuras
 *
 * All UI strings used across the application, organized by component/module.
 * This is the complete translation map. Unused/unreachable keys are kept
 * here as reference but can be pruned once the codebase is stable.
 */
const zhCN: Record<string, string> = {
  // =============================================
  // Global / Common
  // =============================================
  'common.cancel': '取消',
  'common.save': '保存',
  'common.delete': '删除',
  'common.edit': '编辑',
  'common.add': '添加',
  'common.remove': '移除',
  'common.close': '关闭',
  'common.create': '创建',
  'common.import': '导入',
  'common.export': '导出',
  'common.confirm': '确认',
  'common.dismiss': '忽略',
  'common.submit': '提交',
  'common.next': '下一步',
  'common.back': '返回',
  'common.continue': '继续',
  'common.search': '搜索',
  'common.filter': '筛选',
  'common.select': '选择',
  'common.choose': '选择',
  'common.upload': '上传',
  'common.download': '下载',
  'common.refresh': '刷新',
  'common.reload': '重新加载',
  'common.reset': '重置',
  'common.enable': '启用',
  'common.disable': '禁用',
  'common.configure': '配置',
  'common.manage': '管理',
  'common.view': '查看',
  'common.show': '显示',
  'common.hide': '隐藏',
  'common.open': '打开',
  'common.loading': '加载中…',
  'common.error': '错误',
  'common.success': '成功',
  'common.warning': '警告',
  'common.info': '信息',
  'common.name': '名称',
  'common.description': '描述',
  'common.type': '类型',
  'common.status': '状态',
  'common.none': '无',
  'common.unknown': '未知',
  'common.yes': '是',
  'common.no': '否',
  'common.done': '完成',
  'common.retry': '重试',
  'common.copied': '已复制',
  'common.copy': '复制',
  'common.paste': '粘贴',
  'common.rename': '重命名',
  'common.restore': '恢复',
  'common.apply': '应用',
  'common.discard': '放弃',
  'common.generate': '生成',
  'common.preview': '预览',

  // =============================================
  // App Shell / Header / Sidebar
  // =============================================
  'app.title': 'Aventuras',
  'app.generating': '生成中…',
  'app.analyzing': '分析中…',
  'app.settings': '设置',
  'app.close': '关闭',

  'sidebar.story': '故事',
  'sidebar.library': '库',
  'sidebar.lorebook': '知识库',
  'sidebar.memory': '记忆',
  'sidebar.vault': '库管理',
  'sidebar.gallery': '画廊',
  'sidebar.world': '世界',
  'sidebar.characters': '角色',
  'sidebar.locations': '地点',
  'sidebar.inventory': '物品',
  'sidebar.quests': '任务',
  'sidebar.time': '时间',
  'sidebar.branches': '分支',

  // =============================================
  // Story View
  // =============================================
  'story.action_input_placeholder': '输入你的行动…',
  'story.action_do': '做',
  'story.action_say': '说',
  'story.action_think': '想',
  'story.action_story': '故事',
  'story.action_free': '自由',
  'story.send': '发送',
  'story.send_key_hint': 'Enter 发送，Shift+Enter 换行',
  'story.retry': '重试',
  'story.no_story': '还没有故事',
  'story.create_new': '创建新故事',
  'story.pov_first': '第一人称',
  'story.pov_second': '第二人称',
  'story.pov_third': '第三人称',
  'story.tense_past': '过去时',
  'story.tense_present': '现在时',
  'story.add_entry': '添加条目',
  'story.regenerate': '重新生成',
  'story.edit_system_prompt': '编辑系统提示',
  'story.switch_branch': '切换分支',
  'story.current_branch': '当前分支',
  'story.all_branches': '所有分支',
  'story.no_entries': '暂无故事条目',
  'story.error_empty_response': 'AI 返回了空响应，请重试。',
  'story.checkpoint': '存档',
  'story.checkpoints': '存档点',
  'story.create_checkpoint': '创建存档',
  'story.restore_checkpoint': '恢复存档',
  'story.delete_checkpoint': '删除存档',
  'story.rename_checkpoint': '重命名存档',

  // =============================================
  // Settings Modal
  // =============================================
  'settings.title': '设置',
  'settings.subtitle': '配置你的 Aventuras 体验',
  'settings.tab.api': 'API',
  'settings.tab.generation': '生成',
  'settings.tab.images': '图片',
  'settings.tab.interface': '界面',
  'settings.tab.story': '故事',
  'settings.tab.advanced': '高级',
  'settings.tab.experimental': '实验性',
  'settings.tab.tts': 'TTS',
  'settings.reset_all': '重置所有设置',
  'settings.reset_all_desc': '将所有设置重置为默认值。API 密钥将被保留。',
  'settings.reset_all_confirm': '将所有设置重置为默认值？\n\n你的 API 密钥将被保留，但所有其他设置（模型、温度、提示词、UI 偏好）将被重置。\n\n此操作无法撤销。',
  'settings.resetting': '重置中…',
  'settings.reset': '重置',
  'settings.save': '保存',
  'settings.cancel': '取消',
  'settings.close': '关闭',
  'settings.manual_body_title': '手动请求体',
  'settings.manual_body_desc': '编辑手动请求体。这会覆盖请求参数；消息和工具由界面处理。',

  // API settings
  'settings.api.provider': '提供商',
  'settings.api.model': '模型',
  'settings.api.api_key': 'API 密钥',
  'settings.api.base_url': '基础 URL',
  'settings.api.temperature': '温度',
  'settings.api.max_tokens': '最大 Token',
  'settings.api.profiles': 'API 配置文件',
  'settings.api.add_profile': '添加配置文件',
  'settings.api.delete_profile': '删除配置文件',
  'settings.api.edit_profile': '编辑配置文件',
  'settings.api.fetch_models': '获取模型',
  'settings.api.custom_models': '自定义模型',
  'settings.api.main_narrative_profile': '主要叙事配置文件',
  'settings.api.timeout': '请求超时（毫秒）',

  // Translation settings
  'settings.translation.enable': '启用翻译',
  'settings.translation.description': '将 AI 响应翻译为你的语言，同时保留英文提示词以确保最佳 LLM 质量',
  'settings.translation.target_language': '目标语言',
  'settings.translation.target_language_hint': '翻译内容的显示语言',
  'settings.translation.translate_narration': '翻译叙事',
  'settings.translation.translate_input': '翻译用户输入',
  'settings.translation.translate_world_state': '翻译世界状态',

  // Interface settings
  'settings.interface.theme': '主题',
  'settings.interface.font_size': '字体大小',
  'settings.interface.font_family': '字体',
  'settings.interface.font_small': '小',
  'settings.interface.font_medium': '中',
  'settings.interface.font_large': '大',
  'settings.interface.show_word_count': '显示字数',
  'settings.interface.auto_save': '自动保存',
  'settings.interface.spellcheck': '启用拼写检查',
  'settings.interface.story_width': '故事宽度',
  'settings.interface.auto_scroll': '自动滚动',

  // Generation settings
  'settings.generation.preset': '预设',
  'settings.generation.model': '模型',
  'settings.generation.temperature': '温度',
  'settings.generation.max_tokens': '最大 Token',
  'settings.generation.reasoning_effort': '推理力度',
  'settings.generation.manual_mode': '手动模式',
  'settings.generation.manual_body': '手动请求体',
  'settings.generation.classifier': '分类器',
  'settings.generation.memory': '记忆与上下文',
  'settings.generation.suggestions': '建议',
  'settings.generation.agentic': '自主代理',
  'settings.generation.wizard': '故事向导',
  'settings.generation.translation': '翻译',
  'settings.generation.context_window': '上下文窗口',
  'settings.generation.recent_entries': '最近条目数',

  // =============================================
  // Lorebook
  // =============================================
  'lorebook.title': '知识库',
  'lorebook.add_entry': '添加条目',
  'lorebook.import': '导入',
  'lorebook.export': '导出',
  'lorebook.search': '搜索条目…',
  'lorebook.no_entries': '暂无条目',
  'lorebook.type_character': '角色',
  'lorebook.type_location': '地点',
  'lorebook.type_item': '物品',
  'lorebook.type_faction': '派系',
  'lorebook.type_concept': '概念',
  'lorebook.type_event': '事件',
  'lorebook.edit_entry': '编辑条目',
  'lorebook.delete_entry': '删除条目',
  'lorebook.duplicate_entry': '复制条目',
  'lorebook.merge_entry': '合并条目',
  'lorebook.hidden_info': '隐藏信息',
  'lorebook.injection_mode': '注入模式',
  'lorebook.injection_mode_always': '始终',
  'lorebook.injection_mode_keyword': '关键词',
  'lorebook.injection_mode_never': '从不',
  'lorebook.keywords': '关键词',
  'lorebook.aliases': '别名',
  'lorebook.priority': '优先级',

  // =============================================
  // Memory
  // =============================================
  'memory.title': '记忆',
  'memory.chapters': '篇章',
  'memory.chapter_number': '第 {number} 章',
  'memory.create_chapter': '创建篇章',
  'memory.auto_summarize': '自动摘要',
  'memory.retrieval': '检索',
  'memory.token_threshold': 'Token 阈值',
  'memory.chapter_buffer': '篇章缓冲区',
  'memory.summary_detail': '摘要详细程度',
  'memory.summary_concise': '简洁',
  'memory.summary_auto': '自动',
  'memory.summary_precise': '精确',
  'memory.resummarize': '重新摘要',
  'memory.no_chapters': '暂无篇章',

  // =============================================
  // World State (Characters, Locations, Items, Quests)
  // =============================================
  'character.add': '添加角色',
  'character.edit': '编辑角色',
  'character.delete': '删除角色',
  'character.name': '角色名',
  'character.description': '描述',
  'character.relationship': '关系',
  'character.traits': '特质',
  'character.status': '状态',
  'character.status_active': '活跃',
  'character.status_inactive': '不活跃',
  'character.status_deceased': '已故',
  'character.portrait': '头像',
  'character.visual_descriptors': '外观描述',
  'character.set_protagonist': '设为主角',
  'character.protagonist': '主角',
  'character.no_characters': '暂无角色',

  'location.add': '添加地点',
  'location.edit': '编辑地点',
  'location.delete': '删除地点',
  'location.name': '地点名',
  'location.description': '描述',
  'location.visited': '已探索',
  'location.current': '当前位置',
  'location.connections': '连接',
  'location.no_locations': '暂无地点',

  'item.add': '添加物品',
  'item.edit': '编辑物品',
  'item.delete': '删除物品',
  'item.name': '物品名',
  'item.description': '描述',
  'item.quantity': '数量',
  'item.equipped': '已装备',
  'item.location': '位置',
  'item.inventory': '背包',
  'item.no_items': '暂无物品',

  'quest.title': '任务',
  'quest.add': '添加任务',
  'quest.edit': '编辑任务',
  'quest.delete': '删除任务',
  'quest.type_milestone': '里程碑',
  'quest.type_quest': '任务',
  'quest.type_revelation': '揭秘',
  'quest.type_event': '事件',
  'quest.type_plot_point': '剧情节点',
  'quest.status_pending': '待办',
  'quest.status_active': '进行中',
  'quest.status_completed': '已完成',
  'quest.status_failed': '已失败',
  'quest.no_quests': '暂无任务',

  // =============================================
  // Vault
  // =============================================
  'vault.title': '库管理',
  'vault.characters': '角色库',
  'vault.lorebooks': '知识库',
  'vault.scenarios': '场景',
  'vault.import': '导入',
  'vault.export': '导出',
  'vault.create_character': '创建角色',
  'vault.create_lorebook': '创建知识库',
  'vault.create_scenario': '创建场景',
  'vault.search': '搜索…',
  'vault.favorites': '收藏',
  'vault.tags': '标签',
  'vault.edit_tag': '编辑标签',
  'vault.add_tag': '添加标签',

  // =============================================
  // Discovery (Character Tavern)
  // =============================================
  'discovery.title': '发现',
  'discovery.search': '搜索角色卡…',
  'discovery.import': '导入',
  'discovery.preview': '预览',
  'discovery.details': '详情',
  'discovery.no_results': '无搜索结果',

  // =============================================
  // Gallery
  // =============================================
  'gallery.title': '画廊',
  'gallery.no_images': '暂无图片',
  'gallery.generate': '生成图片',
  'gallery.regenerate': '重新生成',

  // =============================================
  // Wizard
  // =============================================
  'wizard.title': '故事向导',
  'wizard.genre': '体裁',
  'wizard.setting': '设定',
  'wizard.prototype': '主角',
  'wizard.characters': '配角',
  'wizard.opening': '开场',
  'wizard.customize': '自定义',
  'wizard.finish': '完成',
  'wizard.seed': '创意种子',
  'wizard.generate': '生成',
  'wizard.regenerate': '重新生成',
  'wizard.select_genre': '选择体裁',
  'wizard.pov': '视角',
  'wizard.tense': '时态',
  'wizard.tone': '基调',

  // =============================================
  // Language Display Names (used in translation dropdown)
  // =============================================
  'lang.auto': '自动检测',
  'lang.en': '英语',
  'lang.es': '西班牙语',
  'lang.fr': '法语',
  'lang.de': '德语',
  'lang.it': '意大利语',
  'lang.pt': '葡萄牙语',
  'lang.ja': '日语',
  'lang.ko': '韩语',
  'lang.zh': '简体中文',
  'lang.ru': '俄语',
  'lang.ar': '阿拉伯语',
  'lang.hi': '印地语',
  'lang.nl': '荷兰语',
  'lang.pl': '波兰语',
  'lang.tr': '土耳其语',
  'lang.vi': '越南语',
  'lang.th': '泰语',

  // =============================================
  // Toast Notifications
  // =============================================
  'toast.saved': '已保存',
  'toast.copied': '已复制',
  'toast.deleted': '已删除',
  'toast.created': '已创建',
  'toast.imported': '已导入',
  'toast.exported': '已导出',
  'toast.error': '操作失败',
  'toast.generation_complete': '生成完成',

  // =============================================
  // Error Messages
  // =============================================
  'error.api_key_missing': '请配置 API 密钥',
  'error.model_not_selected': '请选择模型',
  'error.profile_invalid': '配置文件无效',
  'error.network': '网络错误，请检查连接',
  'error.timeout': '请求超时',
  'error.generation_failed': '生成失败，请重试',
  'error.empty_response': 'AI 返回了空响应',
  'error.save_failed': '保存失败',
  'error.load_failed': '加载失败',
  'error.delete_failed': '删除失败',
  'error.import_failed': '导入失败',
  'error.export_failed': '导出失败',
  'error.unknown': '发生未知错误',

  // =============================================
  // Sync
  // =============================================
  'sync.title': '网络同步',
  'sync.server_mode': '服务器模式',
  'sync.client_mode': '客户端模式',
  'sync.qr_code': 'QR 码',
  'sync.push': '推送',
  'sync.pull': '拉取',
  'sync.connected': '已连接',
  'sync.disconnected': '未连接',
  'sync.start_server': '启动服务器',
  'sync.stop_server': '停止服务器',
  'sync.scan_qr': '扫描 QR 码',
  'sync.no_devices': '未发现设备',

  // =============================================
  // Branch / Checkpoint
  // =============================================
  'branch.title': '分支',
  'branch.create': '创建分支',
  'branch.switch': '切换分支',
  'branch.delete': '删除分支',
  'branch.rename': '重命名分支',
  'branch.fork_from': '从此处分叉',
  'branch.current': '当前分支',
  'branch.no_branches': '无分支',
  'checkpoint.create': '创建存档',
  'checkpoint.restore': '恢复',
  'checkpoint.delete': '删除',
  'checkpoint.rename': '重命名',
  'checkpoint.no_checkpoints': '无存档',

  // =============================================
  // Time / Story Time
  // =============================================
  'time.year': '年',
  'time.years': '年',
  'time.day': '天',
  'time.days': '天',
  'time.hour': '小时',
  'time.hours': '小时',
  'time.minute': '分钟',
  'time.minutes': '分钟',
  'time.story_time': '故事时间',
  'time.format': '第 {year} 年，第 {day} 天，{hours}:{minutes}',

  // =============================================
  // Generation / Suggestions / Action Choices
  // =============================================
  'generation.suggestions': '情节建议',
  'generation.action_choices': '行动选项',
  'generation.loading_suggestions': '生成建议中…',
  'generation.image_generation': '图片生成',
  'generation.generate_image': '生成图片',
  'generation.analyzing': '分析场景…',
  'generation.generating': '生成中…',
  'generation.style_review': '文风分析',
  'generation.show_reasoning': '显示推理过程',
  'generation.hide_reasoning': '隐藏推理过程',
}

export type TranslationKey = keyof typeof zhCN
export default zhCN
