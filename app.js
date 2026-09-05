(() => {
  const STORAGE_KEY = 'mnst.questcalc.web.quests.v1';
  const MAX_SEARCH_CONSTRAINTS = 5;
  const QUEST_TYPES = [
    { id: 'normal', label: 'ノマ' },
    { id: 'event', label: 'イベント' },
    { id: 'other', label: 'その他' },
  ];
  const DEFAULT_QUEST_TYPE = QUEST_TYPES[2].id;
  const DEFAULT_QUESTS = [
    { id: 'quest-1786719983301-qtlbaf', type: 'normal', name: '烈火', experience: 720 },
    { id: 'quest-1786720011935-iyrtka', type: 'normal', name: '緑陰', experience: 840 },
    { id: 'quest-1786720037863-i09dlk', type: 'normal', name: '蒼海', experience: 960 },
    { id: 'quest-1786720068267-aqrhjn', type: 'normal', name: '黄金', experience: 1080 },
    { id: 'quest-1786720090889-zgajpz', type: 'normal', name: '紫黒', experience: 1200 },
    { id: 'quest-1786720158653-o6q7os', type: 'normal', name: '樹海', experience: 1800 },
    { id: 'quest-1786720178696-tu06u5', type: 'normal', name: '極寒', experience: 1900 },
    { id: 'quest-1786720216757-32wr8a', type: 'normal', name: '宵闇', experience: 2100 },
    { id: 'quest-1786720244813-qiduzz', type: 'normal', name: '強風', experience: 3200 },
    { id: 'quest-1786720264426-88a3wt', type: 'normal', name: '突進', experience: 3300 },
    { id: 'quest-1786720286299-qp80ae', type: 'normal', name: '反撃', experience: 3500 },
    { id: 'quest-1786720302304-v29xcg', type: 'normal', name: '能力封じ', experience: 3600 },
    { id: 'quest-1786720374457-wlef24', type: 'normal', name: '砦シリーズ', experience: 4500 },
    { id: 'quest-1786720429140-2tc992', type: 'normal', name: '秘境シリーズ', experience: 5200 },
    { id: 'quest-1786720458390-k7u3nx', type: 'normal', name: '迷宮シリーズ', experience: 7000 },
    { id: 'quest-1786720505711-4v3l7l', type: 'normal', name: '魔殿シリーズ', experience: 10000 },
    { id: 'quest-1786720544038-9vw7oy', type: 'normal', name: '険所シリーズ', experience: 15000 },
    { id: 'quest-1786720577751-brzy16', type: 'normal', name: '魔境シリーズ', experience: 20000 },
    { id: 'quest-1786720614940-evknhz', type: 'normal', name: '危地シリーズ', experience: 40000 },
    { id: 'quest-default-normal-001', type: 'normal', name: '初陣（火）', experience: 45 },
    { id: 'quest-default-normal-002', type: 'normal', name: '初陣（木）', experience: 50 },
    { id: 'quest-default-normal-003', type: 'normal', name: '初陣（水）', experience: 55 },
    { id: 'quest-default-event-001', type: 'event', name: '中級', experience: 500 },
    { id: 'quest-default-event-002', type: 'event', name: '上級', experience: 1000 },
    { id: 'quest-default-event-003', type: 'event', name: '極', experience: 1500 },
    { id: 'quest-default-event-004', type: 'event', name: '究極', experience: 2200 },
    { id: 'quest-default-event-005', type: 'event', name: '超絶・爆絶', experience: 3700 },
    { id: 'quest-default-other-001', type: 'other', name: '強化進化クエスト（上級）', experience: 1000 },
    { id: 'quest-default-other-002', type: 'other', name: '神殿', experience: 3700 },
    { id: 'quest-default-other-003', type: 'other', name: '経験値たんまり！タスの巣窟', experience: 300000 },
    { id: 'quest-default-other-004', type: 'other', name: '大量発生？タス亀強化祭', experience: 10000 },
  ];
  const DEFAULT_QUEST_ID_SET = new Set(DEFAULT_QUESTS.map((quest) => quest.id));

  const multiplierGroups = [
    {
      key: 'spot',
      label: 'スポット',
      options: [
        { id: 'none', label: 'なし', value: 1 },
        { id: 'spot', label: 'スポット', value: 1.25 },
        { id: 'spot-plus', label: 'スポット+', value: 1.5 },
        { id: 'spot-double-plus', label: 'スポット++', value: 1.75 },
      ],
    },
    {
      key: 'wakuwaku',
      label: 'わくわく',
      options: [
        { id: 'none', label: 'なし', value: 1 },
        { id: 'special', label: '特級', value: 1.5 },
        { id: 'special-m', label: '特級M', value: 1.5 },
        { id: 'special-l', label: '特級L', value: 1.6 },
        { id: 'special-el', label: '特級EL', value: 1.65 },
        { id: 'first', label: '1級', value: 1.2 },
        { id: 'first-m', label: '1級M', value: 1.25 },
        { id: 'first-l', label: '1級L', value: 1.3 },
        { id: 'second', label: '2級', value: 1.1 },
        { id: 'second-m', label: '2級M', value: 1.11 },
        { id: 'second-l', label: '2級L', value: 1.12 },
      ],
    },
    {
      key: 'luckBonus',
      label: '運ボ',
      options: [
        { id: 'none', label: 'なし', value: 1 },
        { id: 'yes', label: 'あり', value: 1.05 },
      ],
    },
    {
      key: 'zeele',
      label: 'ゼーレ',
      options: [
        { id: 'none', label: 'なし', value: 1 },
        { id: 'yes', label: 'あり', value: 1.5 },
      ],
    },
    {
      key: 'other',
      label: 'その他',
      options: [
        { id: 'none', label: 'なし', value: 1 },
        { id: 'double', label: '2倍', value: 2 },
        { id: 'triple', label: '3倍', value: 3 },
      ],
    },
    {
      key: 'multi',
      label: 'マルチ',
      options: [
        { id: 'none', label: 'なし', value: 1 },
        { id: 'host', label: 'ホスト', value: 1.05 },
        { id: 'guest', label: 'ゲスト', value: 0.05 },
      ],
    },
  ];

  const defaultSelection = multiplierGroups.reduce((acc, group) => {
    acc[group.key] = group.options[0].id;
    return acc;
  }, {});

  const tabs = [
    {
      key: 'register',
      label: 'クエスト登録',
      title: 'クエストを追加',
      description: 'クエスト名と基礎経験値を登録できます。',
    },
    {
      key: 'list',
      label: 'クエスト一覧',
      title: '登録済みクエストを編集',
      description: '名前と経験値を更新し、個別経験値を確認できます。',
    },
    {
      key: 'search',
      label: '経験値計算',
      title: '目標経験値から逆引き',
      description: '完全一致するクエストと倍率の組み合わせを検索します。',
    },
  ];

  const state = {
    activeTab: 'register',
    quests: [],
    errorMessage: '',
    successMessage: '',
    newQuestName: '',
    newQuestType: QUEST_TYPES[0].id,
    newQuestExperience: '',
    listTypeDraft: QUEST_TYPES[0].id,
    listFilterType: '',
    listFilterApplied: false,
    selectedQuestId: '',
    editingQuestId: '',
    questDraft: null,
    selection: { ...defaultSelection },
    targetExperience: '',
    excludedQuestIds: [],
    searchConstraints: [],
    matchResults: [],
    matchSearched: false,
  };

  const app = document.getElementById('app');

  function normalizeNumber(value) {
    return Number(value.toFixed(6));
  }

  function normalizeExperience(value) {
    return Math.max(1, Math.ceil(value));
  }

  function formatExperience(value) {
    const normalized = normalizeNumber(value);
    return normalized.toLocaleString('ja-JP', {
      minimumFractionDigits: Number.isInteger(normalized) ? 0 : 2,
      maximumFractionDigits: 6,
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function isDefaultQuestId(questId) {
    return DEFAULT_QUEST_ID_SET.has(questId);
  }

  function isValidQuestType(type) {
    return QUEST_TYPES.some((item) => item.id === type);
  }

  function getQuestTypeLabel(type) {
    return QUEST_TYPES.find((item) => item.id === type)?.label ?? 'その他';
  }

  function sortQuests(quests) {
    return [...quests].sort((left, right) => {
      if (left.experience !== right.experience) {
        return left.experience - right.experience;
      }

      return left.name.localeCompare(right.name, 'ja');
    });
  }

  function buildQuestList(customQuests) {
    const defaults = DEFAULT_QUESTS.map((quest) => ({ ...quest, locked: true }));
    const custom = customQuests
      .filter((quest) => !isDefaultQuestId(quest.id))
      .map((quest) => ({
        ...quest,
        type: isValidQuestType(quest.type) ? quest.type : DEFAULT_QUEST_TYPE,
        locked: false,
      }));

    return sortQuests([...defaults, ...custom]);
  }

  function resetMessages() {
    state.errorMessage = '';
    state.successMessage = '';
  }

  function setError(message) {
    state.errorMessage = message;
    state.successMessage = '';
  }

  function setSuccess(message) {
    state.successMessage = message;
    state.errorMessage = '';
    window.setTimeout(() => {
      if (state.successMessage === message) {
        state.successMessage = '';
        render();
      }
    }, 3000);
  }

  function readQuestsFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return buildQuestList([]);
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return buildQuestList([]);
      }

      const customQuests = parsed
        .map((item) => ({
          id: typeof item.id === 'string' ? item.id : createId('quest'),
          type: typeof item.type === 'string' ? item.type : DEFAULT_QUEST_TYPE,
          name: typeof item.name === 'string' ? item.name : '',
          experience: Number(item.experience),
        }))
        .filter((quest) => quest.name && Number.isFinite(quest.experience) && quest.experience > 0)
        .filter((quest) => !isDefaultQuestId(quest.id));

      return buildQuestList(customQuests);
    } catch {
      return buildQuestList([]);
    }
  }

  function writeQuestsToStorage() {
    const customQuests = state.quests
      .filter((quest) => !isDefaultQuestId(quest.id))
      .map((quest) => ({
        id: quest.id,
        type: quest.type,
        name: quest.name,
        experience: quest.experience,
      }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(customQuests));
  }

  function loadQuests() {
    state.quests = readQuestsFromStorage();

    if (state.selectedQuestId && !state.quests.some((quest) => quest.id === state.selectedQuestId)) {
      state.selectedQuestId = '';
    }

    if (state.editingQuestId && !state.quests.some((quest) => quest.id === state.editingQuestId)) {
      state.editingQuestId = '';
      state.questDraft = null;
    }
  }

  function validateQuest(name, experience, type) {
    const normalizedName = String(name || '').trim();
    const normalizedExperience = Number(experience);
    const normalizedType = isValidQuestType(type) ? type : '';

    if (!normalizedType) {
      throw new Error('タイプを選択してください。');
    }

    if (!normalizedName) {
      throw new Error('クエスト名を入力してください。');
    }

    if (!Number.isFinite(normalizedExperience) || normalizedExperience <= 0) {
      throw new Error('経験値は 0 より大きい数値で入力してください。');
    }

    return {
      type: normalizedType,
      name: normalizedName,
      experience: normalizedExperience,
    };
  }

  function buildBreakdown(selection) {
    return selection.map(({ group, option }) => ({
      label: group.label,
      optionLabel: option.label,
      multiplier: option.value,
    }));
  }

  function buildSelectionProduct(selection) {
    return normalizeNumber(selection.reduce((sum, current) => sum * current.option.value, 1));
  }

  function calculateTotalExperience(experience, selection) {
    const multiSelection = selection.find(({ group }) => group.key === 'multi');
    const otherProduct = normalizeNumber(
      selection
        .filter(({ group }) => group.key !== 'multi')
        .reduce((product, current) => product * current.option.value, 1),
    );
    const totalBeforeMulti = normalizeExperience(experience * otherProduct);

    return normalizeExperience(totalBeforeMulti * (multiSelection?.option.value ?? 1));
  }

  function buildCalculationResult(quest, selection) {
    const product = buildSelectionProduct(selection);

    return {
      quest,
      total: calculateTotalExperience(quest.experience, selection),
      product,
      breakdown: buildBreakdown(selection),
    };
  }

  function calculateQuestExperience(quest, selectionByKey) {
    const chosen = multiplierGroups.map((group) => {
      const option = group.options.find((item) => item.id === selectionByKey[group.key]) || group.options[0];
      return { group, option };
    });

    return buildCalculationResult(quest, chosen);
  }

  function createEntrySignature(entry) {
    return [
      entry.quest.id,
      entry.total,
      entry.product,
      ...entry.breakdown.map((item) => `${item.label}:${item.optionLabel}:${item.multiplier}`),
    ].join('|');
  }

  function createMatchSignature(entries) {
    return entries
      .map((entry) => createEntrySignature(entry))
      .sort()
      .join('||');
  }

  function pushGroupedResult(map, result, perTotalLimit) {
    const current = map.get(result.total) || [];
    if (current.length >= perTotalLimit) {
      return;
    }
    current.push(result);
    map.set(result.total, current);
  }

  function buildSelectionCombinations() {
    return multiplierGroups.reduce((accumulator, group) => {
      if (accumulator.length === 0) {
        return group.options.map((option) => [{ group, option }]);
      }

      return accumulator.flatMap((partial) => group.options.map((option) => [...partial, { group, option }]));
    }, []);
  }

  const selectionCombinations = buildSelectionCombinations();

  function matchesConstraints(selection, constraints) {
    if (constraints.length === 0) {
      return true;
    }

    return constraints.every((constraint) =>
      selection.some((item) => item.group.key === constraint.key && item.option.id === constraint.optionId),
    );
  }

  function buildCandidateResults(targetExperience, constraints) {
    const normalizedTarget = normalizeExperience(targetExperience);
    const validSelections = selectionCombinations.filter((selection) => matchesConstraints(selection, constraints));
    const excludedIds = new Set(state.excludedQuestIds);
    const searchableQuests = state.quests.filter((quest) => !excludedIds.has(quest.id));

    if (validSelections.length === 0) {
      return [];
    }

    return searchableQuests.flatMap((quest) =>
      validSelections
        .map((selection) => buildCalculationResult(quest, selection))
        .filter((result) => result.total <= normalizedTarget),
    );
  }

  function buildMatch(entries) {
    return {
      total: normalizeExperience(entries.reduce((sum, entry) => sum + entry.total, 0)),
      entries,
    };
  }

  function pushUniqueMatch(results, signatures, entries, limit) {
    if (results.length >= limit) {
      return;
    }

    const signature = createMatchSignature(entries);
    if (signatures.has(signature)) {
      return;
    }

    signatures.add(signature);
    results.push(buildMatch(entries));
  }

  function findExactMatches(targetExperience, constraints) {
    const target = normalizeExperience(targetExperience);
    const candidateResults = buildCandidateResults(target, constraints);
    const groupedResults = candidateResults.reduce((accumulator, result) => {
      pushGroupedResult(accumulator, result, 4);
      return accumulator;
    }, new Map());

    const singleMatches = (groupedResults.get(target) || []).map((entry) => buildMatch([entry]));
    if (singleMatches.length > 0) {
      return singleMatches;
    }

    const totals = Array.from(groupedResults.keys()).sort((left, right) => left - right);
    const signatures = new Set();
    const matches = [];

    for (let leftIndex = 0; leftIndex < totals.length; leftIndex += 1) {
      const leftTotal = totals[leftIndex];
      const rightTotal = normalizeNumber(target - leftTotal);

      if (rightTotal < leftTotal || !groupedResults.has(rightTotal)) {
        continue;
      }

      const leftEntries = groupedResults.get(leftTotal) || [];
      const rightEntries = groupedResults.get(rightTotal) || [];

      for (const leftEntry of leftEntries) {
        for (const rightEntry of rightEntries) {
          pushUniqueMatch(matches, signatures, [leftEntry, rightEntry], 20);
          if (matches.length >= 20) {
            return matches;
          }
        }
      }
    }

    for (let firstIndex = 0; firstIndex < totals.length; firstIndex += 1) {
      const firstTotal = totals[firstIndex];
      if (firstTotal >= target) {
        break;
      }

      for (let secondIndex = firstIndex; secondIndex < totals.length; secondIndex += 1) {
        const secondTotal = totals[secondIndex];
        const thirdTotal = normalizeNumber(target - firstTotal - secondTotal);

        if (thirdTotal < secondTotal || !groupedResults.has(thirdTotal)) {
          continue;
        }

        const firstEntries = groupedResults.get(firstTotal) || [];
        const secondEntries = groupedResults.get(secondTotal) || [];
        const thirdEntries = groupedResults.get(thirdTotal) || [];

        for (const firstEntry of firstEntries) {
          for (const secondEntry of secondEntries) {
            for (const thirdEntry of thirdEntries) {
              pushUniqueMatch(matches, signatures, [firstEntry, secondEntry, thirdEntry], 20);
              if (matches.length >= 20) {
                return matches;
              }
            }
          }
        }
      }
    }

    return matches;
  }

  function selectionSummary(result) {
    return result.breakdown.map((item) => `${item.label}: ${item.optionLabel} (${item.multiplier}倍)`).join(' / ');
  }

  function matchSummary(match) {
    if (match.entries.length === 1) {
      return '単一クエストで完全一致';
    }

    return `${match.entries.length}件のクエスト合算で完全一致`;
  }

  function currentTabInfo() {
    return tabs.find((tab) => tab.key === state.activeTab) || tabs[0];
  }

  function getSelectedQuest() {
    return state.quests.find((quest) => quest.id === state.selectedQuestId) || null;
  }

  function createSearchConstraint() {
    const firstGroup = multiplierGroups[0];
    return {
      id: createId('constraint'),
      key: firstGroup.key,
      optionId: firstGroup.options[0].id,
    };
  }

  function renderMessages() {
    const error = state.errorMessage ? `<div class="message error">${escapeHtml(state.errorMessage)}</div>` : '';
    const success = state.successMessage ? `<div class="message success">${escapeHtml(state.successMessage)}</div>` : '';
    return `${error}${success}`;
  }

  function renderRegisterTab() {
    const typeOptions = QUEST_TYPES.map(
      (type) => `<option value="${escapeHtml(type.id)}" ${type.id === state.newQuestType ? 'selected' : ''}>${escapeHtml(type.label)}</option>`,
    ).join('');

    return `
      <section class="panel form-panel">
        <form class="quest-form" data-form="create-quest">
          <label>
            <span>タイプ</span>
            <select name="type" class="short-type-select">${typeOptions}</select>
          </label>
          <label>
            <span>クエスト名</span>
            <input name="name" value="${escapeHtml(state.newQuestName)}" placeholder="例: クエスト1" />
          </label>
          <label>
            <span>基礎経験値</span>
            <input name="experience" type="number" min="0" step="0.01" value="${escapeHtml(state.newQuestExperience)}" placeholder="10000" />
          </label>
          <button type="submit" class="primary-button">登録する</button>
        </form>
      </section>
    `;
  }

  function renderQuestListPanel(visibleQuests) {
    if (visibleQuests.length === 0) {
      return `
        <section class="panel">
          <h3>クエスト一覧</h3>
          <p class="empty-state">このタイプのクエストはありません。</p>
        </section>
      `;
    }

    const rows = visibleQuests
      .map((quest) => {
        const isEditing = state.editingQuestId === quest.id && state.questDraft;
        const isLocked = isDefaultQuestId(quest.id);

        return `
          <tr>
            <td>
              ${
                isEditing
                  ? `<input data-edit-name="${escapeHtml(quest.id)}" value="${escapeHtml(state.questDraft.name)}" />`
                  : `<button type="button" class="quest-link" data-select-quest="${escapeHtml(quest.id)}">${escapeHtml(quest.name)}</button>${
                      isLocked ? ' <small>(デフォルト)</small>' : ''
                    }`
              }
            </td>
            <td>
              ${
                isEditing
                  ? `<input data-edit-exp="${escapeHtml(quest.id)}" type="number" min="0" step="0.01" value="${escapeHtml(state.questDraft.experience)}" />`
                  : `<span>${escapeHtml(formatExperience(quest.experience))}</span>`
              }
            </td>
            <td class="actions-cell">
              ${
                isEditing
                  ? `
                    <button type="button" class="primary-button slim" data-action="save-quest" data-id="${escapeHtml(quest.id)}">保存</button>
                    <button type="button" class="danger-button slim" data-action="delete-quest" data-id="${escapeHtml(quest.id)}">削除</button>
                    <button type="button" class="secondary-button slim" data-action="cancel-edit">戻る</button>
                  `
                  : isLocked
                    ? `<span class="constraints-note">編集不可</span>`
                    : `
                    <button type="button" class="secondary-button slim" data-action="begin-edit" data-id="${escapeHtml(quest.id)}">編集</button>
                    <button type="button" class="danger-button slim" data-action="delete-quest" data-id="${escapeHtml(quest.id)}">削除</button>
                  `
              }
            </td>
          </tr>
        `;
      })
      .join('');

    return `
      <section class="panel">
        <h3>クエスト一覧</h3>
        <p class="panel-copy">※「デフォルト」表示のクエストは編集・削除できません。</p>
        <div class="quest-table-wrapper">
          <table class="quest-table">
            <thead>
              <tr>
                <th>クエスト名</th>
                <th>基礎経験値</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderCalculatorPanel() {
    const selectedQuest = getSelectedQuest();
    if (!selectedQuest) {
      return '';
    }

    if (state.listFilterApplied && selectedQuest.type !== state.listFilterType) {
      return '';
    }

    const selectedResult = calculateQuestExperience(selectedQuest, state.selection);
    const questOptions = state.quests
      .filter((quest) => !state.listFilterApplied || quest.type === state.listFilterType)
      .map(
        (quest) =>
          `<option value="${escapeHtml(quest.id)}" ${quest.id === selectedQuest.id ? 'selected' : ''}>${escapeHtml(quest.name)} (${escapeHtml(
            formatExperience(quest.experience),
          )})</option>`,
      )
      .join('');

    const multiplierControls = multiplierGroups
      .map((group) => {
        const options = group.options
          .map(
            (option) =>
              `<option value="${escapeHtml(option.id)}" ${state.selection[group.key] === option.id ? 'selected' : ''}>${escapeHtml(
                option.label,
              )} (${escapeHtml(String(option.value))}倍)</option>`,
          )
          .join('');

        return `
          <label>
            <span>${escapeHtml(group.label)}</span>
            <select data-selection-key="${escapeHtml(group.key)}">${options}</select>
          </label>
        `;
      })
      .join('');

    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>個別経験値計算</h3>
            <p class="panel-copy">選択中: ${escapeHtml(selectedQuest.name)}</p>
          </div>
          <button type="button" class="secondary-button slim" data-action="clear-selected-quest">一覧に戻る</button>
        </div>
        <div class="calculator-grid">
          <label class="full-width">
            <span>クエスト</span>
            <select data-action="selected-quest-select">${questOptions}</select>
          </label>
          ${multiplierControls}
        </div>
        <div class="result-card">
          <p>計算結果</p>
          <strong>${escapeHtml(formatExperience(selectedResult.total))} 経験値</strong>
          <span>合計倍率: ${escapeHtml(String(selectedResult.product))}倍</span>
          <small>${escapeHtml(selectionSummary(selectedResult))}</small>
        </div>
      </section>
    `;
  }

  function renderListTab() {
    const typeOptions = QUEST_TYPES.map(
      (type) => `<option value="${escapeHtml(type.id)}" ${type.id === state.listTypeDraft ? 'selected' : ''}>${escapeHtml(type.label)}</option>`,
    ).join('');
    const visibleQuests = state.listFilterApplied
      ? state.quests.filter((quest) => quest.type === state.listFilterType)
      : [];

    return `
      <div class="stack">
        <section class="panel form-panel">
          <form class="quest-form inline" data-form="list-filter">
            <label>
              <span>表示するタイプ</span>
              <select name="list-type">${typeOptions}</select>
            </label>
            <button type="submit" class="primary-button list-filter-submit">決定</button>
          </form>
          ${state.listFilterApplied ? '' : '<p class="empty-state">タイプを選んで決定するとクエスト一覧を表示します。</p>'}
        </section>
        ${state.listFilterApplied ? renderQuestListPanel(visibleQuests) : ''}
        ${state.listFilterApplied ? renderCalculatorPanel() : ''}
      </div>
    `;
  }

  function renderSearchConstraints() {
    return state.searchConstraints
      .map((constraint) => {
        const selectedGroup = multiplierGroups.find((group) => group.key === constraint.key) || multiplierGroups[0];

        const groupOptions = multiplierGroups
          .map(
            (group) =>
              `<option value="${escapeHtml(group.key)}" ${group.key === constraint.key ? 'selected' : ''}>${escapeHtml(group.label)}</option>`,
          )
          .join('');

        const multiplierOptions = selectedGroup.options
          .map(
            (option) =>
              `<option value="${escapeHtml(option.id)}" ${option.id === constraint.optionId ? 'selected' : ''}>${escapeHtml(option.label)} (${escapeHtml(
                String(option.value),
              )}倍)</option>`,
          )
          .join('');

        return `
          <div class="constraint-row">
            <select data-constraint-key="${escapeHtml(constraint.id)}">${groupOptions}</select>
            <select data-constraint-option="${escapeHtml(constraint.id)}">${multiplierOptions}</select>
            <button type="button" class="danger-button slim" data-action="remove-constraint" data-id="${escapeHtml(constraint.id)}">削除</button>
          </div>
        `;
      })
      .join('');
  }

  function renderSearchResults() {
    if (!state.matchSearched) {
      return '<p class="empty-state">経験値を入力して検索してください。</p>';
    }

    if (state.matchResults.length === 0) {
      return '<p class="empty-state">完全一致する組み合わせは存在しません。</p>';
    }

    return `
      <div class="match-list">
        ${state.matchResults
          .map(
            (match) => `
              <article class="match-card">
                <div>
                  <p>${escapeHtml(matchSummary(match))}</p>
                  <strong>${escapeHtml(formatExperience(match.total))} 経験値</strong>
                </div>
                ${match.entries
                  .map(
                    (entry) => `
                      <div class="match-entry">
                        <span>${escapeHtml(getQuestTypeLabel(entry.quest.type))} / ${escapeHtml(entry.quest.name)}: ${escapeHtml(formatExperience(entry.total))} 経験値</span>
                        <span>基礎経験値: ${escapeHtml(formatExperience(entry.quest.experience))}</span>
                        <span>合計倍率: ${escapeHtml(String(entry.product))}倍</span>
                        <small>${escapeHtml(selectionSummary(entry))}</small>
                      </div>
                    `,
                  )
                  .join('')}
              </article>
            `,
          )
          .join('')}
      </div>
    `;
  }

  function renderSearchTab() {
    const excludedIds = new Set(state.excludedQuestIds);
    const exclusionOptions = state.quests
      .map(
        (quest) =>
          `<option value="${escapeHtml(quest.id)}" ${excludedIds.has(quest.id) ? 'selected' : ''}>${escapeHtml(
            `${getQuestTypeLabel(quest.type)} / ${quest.name} (${formatExperience(quest.experience)})`,
          )}</option>`,
      )
      .join('');

    return `
      <div class="stack">
        <section class="panel form-panel">
          <form class="quest-form search-form" data-form="search-matches">
            <div class="search-constraints">
              <div class="search-constraints-header">
                <span>倍率条件</span>
                <button type="button" class="secondary-button slim" data-action="add-constraint" ${
                  state.searchConstraints.length >= MAX_SEARCH_CONSTRAINTS ? 'disabled' : ''
                }>追加</button>
              </div>
              <small class="constraints-note">未指定なら全倍率が対象。追加は最大5件です。</small>
              ${renderSearchConstraints()}
            </div>
            <label class="full-width">
              <span>除外クエスト</span>
              <select name="exclude-quests" class="exclude-quests-select" multiple>
                ${exclusionOptions}
              </select>
              <small class="constraints-note">選択したクエストは検索候補から除外されます（Ctrl/Shiftで複数選択）。</small>
            </label>
            <label>
              <span>目標経験値</span>
              <input name="target-experience" type="number" min="0" step="0.01" value="${escapeHtml(
                state.targetExperience,
              )}" placeholder="例: 15750" />
            </label>
            <button type="submit" class="primary-button search-submit">完全一致を検索</button>
          </form>
        </section>
        <section class="panel">
          <h3>検索結果</h3>
          ${renderSearchResults()}
        </section>
      </div>
    `;
  }

  function renderTabContents() {
    if (state.activeTab === 'register') {
      return renderRegisterTab();
    }

    if (state.activeTab === 'list') {
      return renderListTab();
    }

    return renderSearchTab();
  }

  function render() {
    const tabInfo = currentTabInfo();

    app.innerHTML = `
      <div class="app-shell">
        <aside class="sidebar">
          <div>
            <p class="eyebrow">mnst quest calc web</p>
            <h1>モンスト経験値Web版</h1>

          </div>
          <nav class="tab-list" aria-label="画面選択">
            ${tabs
              .map(
                (tab) => `
                  <button type="button" class="tab-button ${tab.key === state.activeTab ? 'active' : ''}" data-tab="${escapeHtml(
                    tab.key,
                  )}">
                    <span>${escapeHtml(tab.label)}</span>
                    <small>${escapeHtml(tab.description)}</small>
                  </button>
                `,
              )
              .join('')}
          </nav>
        </aside>
        <main class="content">
          <header class="content-header">
            <div>
              <p class="eyebrow">${escapeHtml(tabInfo.label)}</p>
              <h2>${escapeHtml(tabInfo.title)}</h2>
            </div>
            <button type="button" class="secondary-button" data-action="reset-view">リセット</button>
          </header>
          ${renderMessages()}
          ${renderTabContents()}
        </main>
      </div>
    `;
  }

  function handleCreateQuest(form) {
    resetMessages();
    const type = form.elements.type.value;
    const name = form.elements.name.value;
    const experience = form.elements.experience.value;

    try {
      const normalized = validateQuest(name, experience, type);
      state.quests = sortQuests([...state.quests, {
        id: createId('quest'),
        type: normalized.type,
        name: normalized.name,
        experience: normalized.experience,
        locked: false,
      }]);
      writeQuestsToStorage();
      state.newQuestType = QUEST_TYPES[0].id;
      state.newQuestName = '';
      state.newQuestExperience = '';
      setSuccess('クエストを登録しました。');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'クエスト登録に失敗しました。');
    }

    render();
  }

  function beginEditQuest(questId) {
    const quest = state.quests.find((item) => item.id === questId);
    if (!quest) {
      return;
    }

    if (isDefaultQuestId(questId)) {
      setError('デフォルトクエストは編集できません。');
      render();
      return;
    }

    resetMessages();
    state.editingQuestId = quest.id;
    state.questDraft = {
      name: quest.name,
      experience: String(quest.experience),
    };
    render();
  }

  function cancelEditQuest() {
    state.editingQuestId = '';
    state.questDraft = null;
    render();
  }

  function saveQuest(questId) {
    if (!state.questDraft) {
      return;
    }

    if (isDefaultQuestId(questId)) {
      setError('デフォルトクエストは編集できません。');
      render();
      return;
    }

    resetMessages();

    try {
      const originalQuest = state.quests.find((quest) => quest.id === questId);
      const normalized = validateQuest(state.questDraft.name, state.questDraft.experience, originalQuest?.type);
      state.quests = sortQuests(state.quests.map((quest) =>
        quest.id === questId ? { ...quest, name: normalized.name, experience: normalized.experience } : quest,
      ));
      writeQuestsToStorage();
      state.editingQuestId = '';
      state.questDraft = null;
      setSuccess('クエストを更新しました。');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'クエスト更新に失敗しました。');
    }

    render();
  }

  function deleteQuest(questId) {
    if (isDefaultQuestId(questId)) {
      setError('デフォルトクエストは削除できません。');
      render();
      return;
    }

    resetMessages();
    state.quests = state.quests.filter((quest) => quest.id !== questId);

    if (state.selectedQuestId === questId) {
      state.selectedQuestId = '';
    }

    if (state.editingQuestId === questId) {
      state.editingQuestId = '';
      state.questDraft = null;
    }

    state.excludedQuestIds = state.excludedQuestIds.filter((id) => id !== questId);

    writeQuestsToStorage();
    setSuccess('クエストを削除しました。');
    render();
  }

  function addConstraint() {
    if (state.searchConstraints.length >= MAX_SEARCH_CONSTRAINTS) {
      return;
    }

    state.searchConstraints.push(createSearchConstraint());
    render();
  }

  function removeConstraint(constraintId) {
    state.searchConstraints = state.searchConstraints.filter((item) => item.id !== constraintId);
    render();
  }

  function resetView() {
    resetMessages();
    loadQuests();
    state.activeTab = 'register';
    state.newQuestType = QUEST_TYPES[0].id;
    state.newQuestName = '';
    state.newQuestExperience = '';
    state.listTypeDraft = QUEST_TYPES[0].id;
    state.listFilterType = '';
    state.listFilterApplied = false;
    state.selectedQuestId = '';
    state.editingQuestId = '';
    state.questDraft = null;
    state.selection = { ...defaultSelection };
    state.targetExperience = '';
    state.excludedQuestIds = [];
    state.searchConstraints = [];
    state.matchResults = [];
    state.matchSearched = false;
    render();
  }

  function applyListFilter(type) {
    if (!isValidQuestType(type)) {
      setError('表示タイプを選択してください。');
      render();
      return;
    }

    resetMessages();
    state.listFilterType = type;
    state.listFilterApplied = true;
    state.selectedQuestId = '';
    state.editingQuestId = '';
    state.questDraft = null;
    render();
  }

  function runSearch(form) {
    resetMessages();
    state.matchSearched = true;
    state.targetExperience = form.elements['target-experience'].value;

    const target = Number(state.targetExperience);
    if (!Number.isFinite(target) || target <= 0) {
      setError('検索する経験値は 0 より大きい数値で入力してください。');
      state.matchResults = [];
      render();
      return;
    }

    state.matchResults = findExactMatches(target, state.searchConstraints);
    render();
  }

  app.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const tab = target.closest('[data-tab]');
    if (tab) {
      resetMessages();
      const nextTab = tab.getAttribute('data-tab') || 'register';
      state.activeTab = nextTab;
      if (nextTab === 'list') {
        state.listFilterApplied = false;
        state.selectedQuestId = '';
        state.editingQuestId = '';
        state.questDraft = null;
      }
      render();
      return;
    }

    const selectQuestButton = target.closest('[data-select-quest]');
    if (selectQuestButton) {
      state.selectedQuestId = selectQuestButton.getAttribute('data-select-quest') || '';
      state.editingQuestId = '';
      state.questDraft = null;
      render();
      return;
    }

    const actionButton = target.closest('[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    const id = actionButton.getAttribute('data-id') || '';

    if (action === 'begin-edit') {
      beginEditQuest(id);
      return;
    }

    if (action === 'cancel-edit') {
      cancelEditQuest();
      return;
    }

    if (action === 'save-quest') {
      saveQuest(id);
      return;
    }

    if (action === 'delete-quest') {
      deleteQuest(id);
      return;
    }

    if (action === 'clear-selected-quest') {
      state.selectedQuestId = '';
      render();
      return;
    }

    if (action === 'add-constraint') {
      addConstraint();
      return;
    }

    if (action === 'remove-constraint') {
      removeConstraint(id);
      return;
    }

    if (action === 'reset-view') {
      resetView();
      return;
    }

    if (action === 'selected-quest-select') {
      const select = actionButton;
      if (select instanceof HTMLSelectElement) {
        state.selectedQuestId = select.value;
        render();
      }
      return;
    }
  });

  app.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target instanceof HTMLInputElement && target.name === 'name') {
      state.newQuestName = target.value;
      return;
    }

    if (target instanceof HTMLSelectElement && target.name === 'type') {
      state.newQuestType = target.value;
      return;
    }

    if (target instanceof HTMLInputElement && target.name === 'experience') {
      state.newQuestExperience = target.value;
      return;
    }

    if (target instanceof HTMLInputElement && target.name === 'target-experience') {
      state.targetExperience = target.value;
      return;
    }

    if (target instanceof HTMLSelectElement && target.name === 'exclude-quests') {
      state.excludedQuestIds = Array.from(target.selectedOptions, (option) => option.value);
      return;
    }

    if (target instanceof HTMLInputElement && target.hasAttribute('data-edit-name') && state.questDraft) {
      state.questDraft.name = target.value;
      return;
    }

    if (target instanceof HTMLInputElement && target.hasAttribute('data-edit-exp') && state.questDraft) {
      state.questDraft.experience = target.value;
    }
  });

  app.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target instanceof HTMLSelectElement && target.name === 'type') {
      state.newQuestType = target.value;
      return;
    }

    if (target instanceof HTMLSelectElement && target.name === 'list-type') {
      state.listTypeDraft = target.value;
      return;
    }

    if (target instanceof HTMLSelectElement && target.name === 'exclude-quests') {
      state.excludedQuestIds = Array.from(target.selectedOptions, (option) => option.value);
      return;
    }

    if (target instanceof HTMLSelectElement && target.hasAttribute('data-selection-key')) {
      const key = target.getAttribute('data-selection-key');
      if (key) {
        state.selection[key] = target.value;
        render();
      }
      return;
    }

    if (target instanceof HTMLSelectElement && target.hasAttribute('data-constraint-key')) {
      const constraintId = target.getAttribute('data-constraint-key');
      const nextGroup = multiplierGroups.find((group) => group.key === target.value) || multiplierGroups[0];

      state.searchConstraints = state.searchConstraints.map((constraint) =>
        constraint.id === constraintId
          ? {
              ...constraint,
              key: nextGroup.key,
              optionId: nextGroup.options[0].id,
            }
          : constraint,
      );
      render();
      return;
    }

    if (target instanceof HTMLSelectElement && target.hasAttribute('data-constraint-option')) {
      const constraintId = target.getAttribute('data-constraint-option');
      state.searchConstraints = state.searchConstraints.map((constraint) =>
        constraint.id === constraintId
          ? {
              ...constraint,
              optionId: target.value,
            }
          : constraint,
      );
      render();
      return;
    }

    if (target instanceof HTMLSelectElement && target.closest('[data-action="selected-quest-select"]')) {
      state.selectedQuestId = target.value;
      render();
    }
  });

  app.addEventListener('submit', (event) => {
    event.preventDefault();
    const target = event.target;
    if (!(target instanceof HTMLFormElement)) {
      return;
    }

    if (target.getAttribute('data-form') === 'create-quest') {
      handleCreateQuest(target);
      return;
    }

    if (target.getAttribute('data-form') === 'list-filter') {
      applyListFilter(target.elements['list-type'].value);
      return;
    }

    if (target.getAttribute('data-form') === 'search-matches') {
      runSearch(target);
    }
  });

  function init() {
    loadQuests();
    render();
  }

  init();
})();
